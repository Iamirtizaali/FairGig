import { Router } from 'express';

export const boardRouter = Router();

/**
 * @openapi
 * /grievance/v1/board:
 *   get:
 *     tags: [Bulletin Board]
 *     summary: Public anonymised complaint bulletin board
 *     description: |
 *       Returns publicly visible complaints with author identities stripped.
 *       No authentication required. Shows only public_anon, non-hidden complaints.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated bulletin board
 */
// Re-use the same controller function — it's imported via complaintsRouter's controller
// but exposed without auth here
import * as ctrl from '../controllers/complaint.controller';
boardRouter.get('/', ctrl.getBulletinBoard);
