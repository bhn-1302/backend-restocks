import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export default function (prisma: PrismaClient) {
  const router = Router();

  // Listar bebidas por categoria
  router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const drinks = await prisma.drink.findMany({ where: { categoryId: Number(categoryId) } });
    res.json(drinks);
  });

  // Criar bebida
  router.post("/", async (req, res) => {
    const { name, quantity, categoryId } = req.body;
    if (!name || !quantity || !categoryId)
      return res.status(400).json({ error: "name, quantity e categoryId obrigatórios" });

    const drink = await prisma.drink.create({
      data: { name, quantity, categoryId: Number(categoryId) },
    });
    res.status(201).json(drink);
  });

  // Atualizar bebida
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    if (!name && !quantity) return res.status(400).json({ error: "Enviar name ou quantity" });

    const updated = await prisma.drink.update({
      where: { id: Number(id) },
      data: { name, quantity },
    });
    res.json(updated);
  });

  // Deletar bebida
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.drink.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  });

  return router;
}
