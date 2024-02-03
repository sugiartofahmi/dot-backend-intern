import { z } from 'zod';
import { books } from '@api/models';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
export const VSCreateBook = z.object({
  ...createInsertSchema(books).pick({
    title: true,
  }).shape,
  authorId: z.string().uuid(),
});
export const VSUpdateBook = z.object({
  ...createSelectSchema(books, {
    title: z.string().optional(),
  }).pick({
    title: true,
  }).shape,
  authorId: z.string().uuid().optional(),
});
