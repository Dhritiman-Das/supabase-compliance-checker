import express from "express";
import {
  checkCompliance,
  getEvidenceLogs,
} from "../controllers/compliance.controller";
import { RequestWithUser } from "src/types/global";
import authenticateJWT from "../middlewares/authenticateJwt";

const router = express.Router();

/**
 * @swagger
 * /check-status:
 *   get:
 *     summary: Check compliance status
 *     description: This endpoint checks the compliance status for the authenticated user based on Supabase credentials.
 *     tags:
 *       - Compliance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with compliance status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 complianceStatus:
 *                   type: object
 *                   properties:
 *                     userMFAStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                             example: "iamdhritiman01@gmail.com"
 *                           mfa_status:
 *                             type: boolean
 *                             example: false
 *                     tableRLSStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tableName:
 *                             type: string
 *                             example: "Post"
 *                           rlsEnabled:
 *                             type: boolean
 *                             example: true
 *                           tableSchema:
 *                             type: string
 *                             example: "public"
 *                     projectPITRStatus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           projectId:
 *                             type: string
 *                             example: "asdasdufoftarcbfqwuxj"
 *                           project:
 *                             type: string
 *                             example: "Dhritiman-Das's Project"
 *                           pitrEnabled:
 *                             type: boolean
 *                             example: false
 *       400:
 *         description: Missing Supabase credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing Supabase credentials"
 *       500:
 *         description: An error occurred while checking compliance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This is an unfortunate error"
 */
router.get("/check-status", authenticateJWT, (req, res) => {
  checkCompliance(req as RequestWithUser, res);
});

router.get("/evidence-logs", authenticateJWT, (req, res) => {
  getEvidenceLogs(req as RequestWithUser, res);
});

export { router as complianceRoutes };
