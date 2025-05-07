import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    const { username, email, password } = parsed.data;

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res
      .status(200)
      .json({ id: user.id, email: user.email, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
