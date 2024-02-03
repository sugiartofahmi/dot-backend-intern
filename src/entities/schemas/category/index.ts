import { categories } from '@api/models';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const VSCreateCategory = createInsertSchema(categories).pick({
  name: true,
});

export const VSUpdateCategory = createInsertSchema(categories, {
  name: z.string().optional(),
}).pick({
  name: true,
});
