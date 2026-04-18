import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import { createClusterSchema, attachToClusterSchema } from '../validators/grievance.schema';
import * as ctrl from '../controllers/cluster.controller';

export const clustersRouter = Router();

clustersRouter.use(authenticate);

/**
 * @openapi
 * /grievance/v1/clusters/suggestions:
 *   get:
 *     tags: [Clusters]
 *     summary: Get TF-IDF similarity suggestions for a seed complaint
 *     description: |
 *       Returns up to 5 complaints most textually similar to the seed, computed
 *       using TF-IDF cosine similarity on title + description.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: seedId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of similar complaints with similarity scores
 */
clustersRouter.get('/suggestions', rbac('advocate', 'admin'), ctrl.getClusterSuggestions);

/**
 * @openapi
 * /grievance/v1/clusters:
 *   get:
 *     tags: [Clusters]
 *     summary: List complaint clusters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated cluster list
 */
clustersRouter.get('/', ctrl.listClusters);

/**
 * @openapi
 * /grievance/v1/clusters:
 *   post:
 *     tags: [Clusters]
 *     summary: Create a new cluster (advocate/admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, maxLength: 200 }
 *               description: { type: string, maxLength: 1000 }
 *     responses:
 *       201:
 *         description: Cluster created
 */
clustersRouter.post(
  '/',
  rbac('advocate', 'admin'),
  validate(createClusterSchema),
  ctrl.createCluster,
);

/**
 * @openapi
 * /grievance/v1/clusters/{id}/attach:
 *   post:
 *     tags: [Clusters]
 *     summary: Attach complaints to a cluster (advocate/admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [complaintIds]
 *             properties:
 *               complaintIds:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200:
 *         description: Complaints attached
 */
clustersRouter.post(
  '/:id/attach',
  rbac('advocate', 'admin'),
  validate(attachToClusterSchema),
  ctrl.attachToCluster,
);
