import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const PLATFORMS = [
  { name: 'Uber', slug: 'uber', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/120px-Uber_logo_2018.svg.png' },
  { name: 'Careem', slug: 'careem', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Careem_logo.svg/120px-Careem_logo.svg.png' },
  { name: 'Bykea', slug: 'bykea', logoUrl: null },
  { name: 'Foodpanda', slug: 'foodpanda', logoUrl: null },
  { name: 'inDrive', slug: 'indrive', logoUrl: null },
];

const CITY_ZONES: { city: string; zone: string }[] = [
  // Lahore
  { city: 'Lahore', zone: 'Gulberg' },
  { city: 'Lahore', zone: 'DHA' },
  { city: 'Lahore', zone: 'Johar Town' },
  { city: 'Lahore', zone: 'Model Town' },
  { city: 'Lahore', zone: 'Cantt' },
  { city: 'Lahore', zone: 'Bahria Town' },
  { city: 'Lahore', zone: 'Allama Iqbal Town' },
  // Karachi
  { city: 'Karachi', zone: 'Clifton' },
  { city: 'Karachi', zone: 'DHA' },
  { city: 'Karachi', zone: 'Gulshan-e-Iqbal' },
  { city: 'Karachi', zone: 'Korangi' },
  { city: 'Karachi', zone: 'SITE' },
  { city: 'Karachi', zone: 'North Nazimabad' },
  { city: 'Karachi', zone: 'Saddar' },
  // Islamabad / Rawalpindi
  { city: 'Islamabad', zone: 'F-7' },
  { city: 'Islamabad', zone: 'F-10' },
  { city: 'Islamabad', zone: 'G-9' },
  { city: 'Islamabad', zone: 'Blue Area' },
  { city: 'Islamabad', zone: 'DHA' },
  { city: 'Islamabad', zone: 'Bahria Town' },
];

async function main() {
  console.log('🌱  Seeding earnings service...');

  for (const p of PLATFORMS) {
    await prisma.platform.upsert({
      where: { slug: p.slug },
      update: { name: p.name, logoUrl: p.logoUrl },
      create: p,
    });
  }
  console.log(`   ✔  ${PLATFORMS.length} platforms`);

  for (const z of CITY_ZONES) {
    await prisma.cityZone.upsert({
      where: { city_zone: { city: z.city, zone: z.zone } },
      update: {},
      create: z,
    });
  }
  console.log(`   ✔  ${CITY_ZONES.length} city zones`);

  console.log('✅  Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
