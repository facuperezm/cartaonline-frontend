import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const TokenPayloadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type Login = z.infer<typeof LoginSchema>;
export type TokenPayload = z.infer<typeof TokenPayloadSchema> | null;
