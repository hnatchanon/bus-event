// pages/api/auth/login.js
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // เชื่อมต่อ Prisma Client
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      const user = await prisma.user.findUnique({
        // ใช้ user แทน User
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // ตรวจสอบรหัสผ่าน
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // ตรวจสอบว่า user มีข้อมูลที่จำเป็นใน payload
      const payload = { username: user.username };
      if (!payload.username) {
        return res.status(500).json({ error: "Invalid user data" });
      }

      // สร้าง JWT
      const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
