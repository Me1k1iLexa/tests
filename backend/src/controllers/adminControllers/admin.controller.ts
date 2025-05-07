import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, createdAt: true },
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting users" });
  }
};
