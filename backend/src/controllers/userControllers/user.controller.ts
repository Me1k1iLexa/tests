import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;

    type UserPublic = Omit<User, "password">;
    const userForClient: UserPublic = userWithoutPassword;
    res.json(userForClient);
    return;
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
    return;
  }
};
