import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "invalid email or password" });
      return;
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "invalid email or password" });
      return;
    }

    const existingPassword = await bcrypt.compare(password, user.password);
    if (!existingPassword) {
      res.status(400).json({ error: "invalid email or password" });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
    return;
  }
};
