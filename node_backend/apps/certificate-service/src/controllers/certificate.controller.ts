import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import * as certService from '../services/certificate.service';

export const buildCertificate = asyncHandler(async (req: Request, res: Response) => {
  const data = await certService.buildCertificateData(req.user!.sub, {
    from: String(req.query['from'] ?? ''),
    to: String(req.query['to'] ?? ''),
  });
  sendSuccess(res, data);
});

export const shareCertificate = asyncHandler(async (req: Request, res: Response) => {
  const result = await certService.shareCertificate(req.user!.sub, req.body);
  sendCreated(res, result);
});

export const getPublicCertificate = asyncHandler(async (req: Request, res: Response) => {
  const accept = req.headers.accept ?? '';
  const token = String(req.params['signedId']);

  if (accept.includes('text/html')) {
    const html = await certService.getPublicCertificateHtml(token);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } else {
    const data = await certService.getPublicCertificate(token);
    sendSuccess(res, data);
  }
});

export const revokeCertificate = asyncHandler(async (req: Request, res: Response) => {
  const result = await certService.revokeCertificate(
    String(req.params['signedId']),
    req.user!.sub,
  );
  sendSuccess(res, result);
});
