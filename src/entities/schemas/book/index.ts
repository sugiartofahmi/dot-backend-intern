import { z } from 'zod';
import { books } from '@api/models';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
export const VSCreateBook = createInsertSchema(books, {
  title: z.string().nonempty(),
}).pick({
  title: true,
});

export const VSUpdateBook = createSelectSchema(books, {
  title: z.string().optional(),
}).pick({
  title: true,
});
