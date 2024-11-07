// pages/api/events.js
import prisma from "@/lib/prisma"; // ตรวจสอบให้แน่ใจว่า path นี้ถูกต้อง

export default async function handler(req, res) {
  console.log(req.body);

  if (req.method === "POST") {
    const { name, description, date, location, tags } = req.body;

    console.log(req.body);

    if (!name || !description || !date || !location || !tags) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const event = await prisma.event.create({
        data: {
          name,
          description,
          date: new Date(date),
          location,
          tags,
        },
      });

      return res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
