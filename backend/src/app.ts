import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS middleware
import { userRoutes } from "./api/routes/user.routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";
import { complianceRoutes } from "./api/routes/compliance.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

dotenv.config();

const app = express();

// Enable CORS for the FRONTEND_URL
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow requests from FRONTEND_URL
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/compliance", complianceRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
