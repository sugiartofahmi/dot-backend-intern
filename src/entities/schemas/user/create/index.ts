import { z } from 'zod';

export const VSCreateUser = z
  .object({
    fullname: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8).nonempty(),
  })
  .required();

export type CreateUserDto = z.infer<typeof VSCreateUser>;
