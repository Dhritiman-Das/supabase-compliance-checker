import express from "express";
import {
  createUser,
  getMe,
  setupSupabase,
  updateUserProperty,
} from "../controllers/user.controller";
import authenticateJWT from "../middlewares/authenticateJwt";
import { RequestWithUser } from "src/types/global";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/users/get-me:
 *   get:
 *     summary: Get the authenticated user's details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/get-me", authenticateJWT, (req, res) => {
  getMe(req as RequestWithUser, res);
});

/**
 * @swagger
 * /api/users/setup-supabase:
 *   post:
 *     summary: Setup Supabase credentials for the user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supabaseUrl:
 *                 type: string
 *                 example: https://xyzcompany.supabase.co
 *               supabaseAnonKey:
 *                 type: string
 *                 example: your-anon-key
 *               supabaseApiKey:
 *                 type: string
 *                 example: your-api-key
 *     responses:
 *       200:
 *         description: Supabase setup successful
 *       500:
 *         description: Internal server error
 */
router.post("/setup-supabase", authenticateJWT, (req, res) => {
  setupSupabase(req as RequestWithUser, res);
});

/**
 * @swagger
 * /api/users/update-property:
 *   patch:
 *     summary: Update a user property
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyName:
 *                 type: string
 *                 example: email
 *               propertyValue:
 *                 type: string
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/update-property", authenticateJWT, (req, res) => {
  updateUserProperty(req as RequestWithUser, res);
});

export { router as userRoutes };
