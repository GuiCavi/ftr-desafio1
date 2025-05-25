import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["local", "dev", "test", "production"]).default("production"),
});

export const env = envSchema.parse(process.env);