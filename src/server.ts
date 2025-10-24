import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import categoryRoutes from "./routes/categoryRoutes.js";
import drinkRoutes from "./routes/drinkRoutes.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API funcionando 🚀"));

// Rotas
app.use("/categories", categoryRoutes(prisma));
app.use("/drinks", drinkRoutes(prisma));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
