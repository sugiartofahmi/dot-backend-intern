import { z } from 'zod';

export const VSLogin = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().min(8).nonempty(),
  })
  .required();

export type LoginDto = z.infer<typeof VSLogin>;
