import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | object;
}

const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Token format: 'Bearer TOKEN'

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded; // Attach the decoded user info to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticateJWT;
