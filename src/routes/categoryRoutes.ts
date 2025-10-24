import { Router } from "express";
import { PrismaClient } from "../generated/client.js";

export default function(prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany({ include: { drinks: true } });
    res.json(categories);
  });

  router.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome obrigatório" });

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(updated);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  });

  return router;
}
