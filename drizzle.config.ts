// @ts-nocheck
// Note: This config is for Drizzle ORM migrations (PostgreSQL)
// If using Firebase for this project, this file can be safely ignored or removed
// The drizzle-kit package is not installed as Firebase is being used instead

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL || "postgresql://localhost:5432/temp";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
