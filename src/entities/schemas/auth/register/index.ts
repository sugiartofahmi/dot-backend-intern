import { z } from 'zod';

export const VSRegister = z
  .object({
    fullname: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8).nonempty(),
  })
  .required();

export type TVSRegister = z.infer<typeof VSRegister>;
