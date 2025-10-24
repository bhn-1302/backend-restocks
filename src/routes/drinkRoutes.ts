import { Router } from "express";
import { PrismaClient } from "../generated/client.js";

export default function(prisma: PrismaClient) {
  const router = Router();

  router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const drinks = await prisma.drink.findMany({ where: { categoryId: Number(categoryId) } });
    res.json(drinks);
  });

  router.post("/", async (req, res) => {
    const { name, quantity, categoryId } = req.body;
    if (!name || !quantity || !categoryId)
      return res.status(400).json({ error: "name, quantity e categoryId obrigatórios" });

    const drink = await prisma.drink.create({
      data: { name, quantity, categoryId: Number(categoryId) }
    });
    res.status(201).json(drink);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updated = await prisma.drink.update({
      where: { id: Number(id) },
      data: { name, quantity }
    });
    res.json(updated);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.drink.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  });

  return router;
}
