import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}
const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined");

  try {
    req.user = jwt.verify(token, secret) as DecodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};

export { authMiddleware };
