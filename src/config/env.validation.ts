import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string().min(16, "El JWT secret es crítico y debe ser largo"),
  DATABASE_URL: z.string().url(),
});

export function validateEnv(config: Record<string, unknown>) {
  return envSchema.parse(config); // Si falla, lanza un error y aborta el arranque
}