import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export default function (prisma: PrismaClient) {
  const router = Router();

  // Listar todas categorias
  router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany({ include: { drinks: true } });
    res.json(categories);
  });

  // Criar categoria
  router.post("/", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome obrigatório" });
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  });

  // Atualizar categoria
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome obrigatório" });

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updated);
  });

  // Deletar categoria
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  });

  return router;
}
