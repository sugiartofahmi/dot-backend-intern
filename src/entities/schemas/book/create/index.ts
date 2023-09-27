import { z } from 'zod';

export const VSCreateBook = z
  .object({
    title: z.string().nonempty(),
  })
  .required();

export type CreateBookDto = z.infer<typeof VSCreateBook>;
