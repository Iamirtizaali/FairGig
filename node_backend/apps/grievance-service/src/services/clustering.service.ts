import natural from 'natural';
import { complaintRepository } from '../repositories/complaint.repository';

const TfIdf = natural.TfIdf;

export async function getClusterSuggestions(
  seedId: string,
  topN = 5,
): Promise<Array<{ id: string; title: string; score: number }>> {
  const all = await complaintRepository.findAllForTfidf();
  if (all.length < 2) return [];

  const seed = all.find((c) => c.id === seedId);
  if (!seed) return [];

  const tfidf = new TfIdf();

  // Add all documents — index matches array position
  for (const doc of all) {
    tfidf.addDocument(`${doc.title} ${doc.description}`);
  }

  const seedIdx = all.findIndex((c) => c.id === seedId);
  const scores: Array<{ id: string; title: string; score: number }> = [];

  all.forEach((doc, idx) => {
    if (idx === seedIdx) return;

    // Compute cosine-like similarity by summing shared TF-IDF weights
    const seedTerms = new Map<string, number>();
    tfidf.listTerms(seedIdx).forEach(({ term, tfidf: w }) => seedTerms.set(term, w));

    let sim = 0;
    tfidf.listTerms(idx).forEach(({ term, tfidf: w }) => {
      if (seedTerms.has(term)) sim += w * (seedTerms.get(term) ?? 0);
    });

    if (sim > 0) scores.push({ id: doc.id, title: doc.title, score: sim });
  });

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => ({ id: s.id, title: s.title, score: parseFloat(s.score.toFixed(4)) }));
}
