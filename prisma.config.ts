import "dotenv/config"; // <- carrega variáveis do .env automaticamente
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"), // agora vai ler do .env
  },
});
