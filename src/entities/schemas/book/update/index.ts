import { z } from 'zod';

export const VSUpdateBook = z.object({
  title: z.string().optional(),
});

export type UpdateBookDto = z.infer<typeof VSUpdateBook>;
