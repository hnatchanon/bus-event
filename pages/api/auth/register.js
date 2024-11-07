// pages/api/auth/register.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // ตรวจสอบว่ามี username อยู่แล้วหรือยัง
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // เข้ารหัส password และบันทึก username ลง database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json(user);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
