import { z } from 'zod';

export const VSUser = z
  .object({
    fullname: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8).nonempty(),
  })
  .required();

export type UserDto = z.infer<typeof VSUser>;
