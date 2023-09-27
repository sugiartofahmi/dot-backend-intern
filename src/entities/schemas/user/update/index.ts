import { z } from 'zod';

export const VSUpdateUser = z.object({
  fullname: z.string().optional(),
  password: z.string().min(8).optional(),
  role_id: z.number().optional(),
});

export type UpdateUserDto = z.infer<typeof VSUpdateUser>;
