import { Router, type Router as ExpressRouter } from 'express';
import { authRateLimit, passwordResetRateLimit } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateMeSchema,
  roleRequestSchema,
  roleRequestDecisionSchema,
  updateUserStatusSchema,
} from '../validators/auth.schema';
import * as ctrl from '../controllers/auth.controller';

export const authRouter: ExpressRouter = Router();

// ─── Public endpoints ─────────────────────────────────────────────────────────

/**
 * @openapi
 * /auth/v1/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new worker account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Ali Raza
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali@example.com
 *               phone:
 *                 type: string
 *                 example: "+923001234567"
 *               password:
 *                 type: string
 *                 minLength: 10
 *                 example: mypassword1
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       409:
 *         description: Email already in use
 *       422:
 *         description: Validation error
 */
authRouter.post('/register', authRateLimit, validate(registerSchema), ctrl.register);

/**
 * @openapi
 * /auth/v1/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive access + refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali@example.com
 *               password:
 *                 type: string
 *                 example: mypassword1
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account frozen
 *       422:
 *         description: Validation error
 */
authRouter.post('/login', authRateLimit, validate(loginSchema), ctrl.login);

/**
 * @openapi
 * /auth/v1/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Rotate refresh token and get a new access token
 *     description: Reads the refreshToken httpOnly cookie set during login.
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *       401:
 *         description: Refresh token missing, revoked, or expired
 */
authRouter.post('/refresh', ctrl.refresh);

/**
 * @openapi
 * /auth/v1/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Revoke refresh token and clear cookie
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
authRouter.post('/logout', ctrl.logout);

/**
 * @openapi
 * /auth/v1/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset email
 *     description: Always returns 200 — never reveals whether the email exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali@example.com
 *     responses:
 *       200:
 *         description: Email sent if account exists
 *       422:
 *         description: Validation error
 */
authRouter.post('/forgot-password', passwordResetRateLimit, validate(forgotPasswordSchema), ctrl.forgotPassword);

/**
 * @openapi
 * /auth/v1/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using a token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword]
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Token invalid or expired
 *       422:
 *         description: Validation error
 */
authRouter.post('/reset-password', passwordResetRateLimit, validate(resetPasswordSchema), ctrl.resetPassword);

// ─── Authenticated endpoints ──────────────────────────────────────────────────

/**
 * @openapi
 * /auth/v1/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Not authenticated
 */
authRouter.get('/me', authenticate, ctrl.getMe);

/**
 * @openapi
 * /auth/v1/me:
 *   patch:
 *     tags: [Auth]
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [en, ur]
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               cityZoneId:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Not authenticated
 *       422:
 *         description: Validation error
 */
authRouter.patch('/me', authenticate, validate(updateMeSchema), ctrl.updateMe);

/**
 * @openapi
 * /auth/v1/change-password:
 *   post:
 *     tags: [Auth]
 *     summary: Change password (requires current password)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       200:
 *         description: Password changed
 *       401:
 *         description: Current password incorrect
 *       422:
 *         description: Validation error
 */
authRouter.post('/change-password', authenticate, validate(changePasswordSchema), ctrl.changePassword);

// ─── Role requests ────────────────────────────────────────────────────────────

/**
 * @openapi
 * /auth/v1/role-requests:
 *   post:
 *     tags: [Role Requests]
 *     summary: Create a role upgrade request (worker only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [requestedRole]
 *             properties:
 *               requestedRole:
 *                 type: string
 *                 enum: [employer]
 *               reason:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Request created
 *       409:
 *         description: Duplicate pending request
 *       403:
 *         description: Only workers can request role upgrades
 */
authRouter.post('/role-requests', authenticate, rbac('worker'), validate(roleRequestSchema), ctrl.createRoleRequest);

/**
 * @openapi
 * /auth/v1/role-requests:
 *   get:
 *     tags: [Role Requests]
 *     summary: List pending role requests (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Paginated list of pending requests
 *       403:
 *         description: Admin only
 */
authRouter.get('/role-requests', authenticate, rbac('admin'), ctrl.getRoleRequests);

/**
 * @openapi
 * /auth/v1/role-requests/{id}/approve:
 *   post:
 *     tags: [Role Requests]
 *     summary: Approve a role request (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request approved
 *       404:
 *         description: Request not found
 *       409:
 *         description: Already decided
 */
authRouter.post('/role-requests/:id/approve', authenticate, rbac('admin'), ctrl.approveRoleRequest);

/**
 * @openapi
 * /auth/v1/role-requests/{id}/reject:
 *   post:
 *     tags: [Role Requests]
 *     summary: Reject a role request (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request rejected
 *       404:
 *         description: Request not found
 *       409:
 *         description: Already decided
 */
authRouter.post('/role-requests/:id/reject', authenticate, rbac('admin'), validate(roleRequestDecisionSchema), ctrl.rejectRoleRequest);

// ─── Admin: user management ───────────────────────────────────────────────────

/**
 * @openapi
 * /auth/v1/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: List all users with optional filters (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [worker, verifier, advocate, admin] }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [active, frozen, deleted] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name or email (case-insensitive)
 *     responses:
 *       200:
 *         description: Paginated user list
 *       403:
 *         description: Admin only
 */
authRouter.get('/admin/users', authenticate, rbac('admin'), ctrl.listUsers);

/**
 * @openapi
 * /auth/v1/admin/audit:
 *   get:
 *     tags: [Admin]
 *     summary: Browse the audit log (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *       - in: query
 *         name: actorId
 *         schema: { type: string }
 *       - in: query
 *         name: action
 *         schema: { type: string }
 *         description: Partial match on action string
 *       - in: query
 *         name: entity
 *         schema: { type: string }
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date-time }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Paginated audit events
 *       403:
 *         description: Admin only
 */
authRouter.get('/admin/audit', authenticate, rbac('admin'), ctrl.getAuditLog);

/**
 * @openapi
 * /auth/v1/admin/users/{id}/status:
 *   patch:
 *     tags: [Admin]
 *     summary: Freeze or unfreeze a user account (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, frozen]
 *     responses:
 *       200:
 *         description: Status updated
 *       404:
 *         description: User not found
 *       403:
 *         description: Admin only
 */
authRouter.patch('/admin/users/:id/status', authenticate, rbac('admin'), validate(updateUserStatusSchema), ctrl.updateUserStatus);
