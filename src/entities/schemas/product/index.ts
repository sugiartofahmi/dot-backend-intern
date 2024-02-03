import { products } from '@api/models';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const VSCreateProduct = createInsertSchema(products).pick({
  name: true,
  price: true,
  categoryId: true,
});

export const VSUpdateProduct = createInsertSchema(products, {
  name: z.string().optional(),
  price: z.string().optional(),
  categoryId: z.string().uuid().optional(),
}).pick({
  name: true,
  price: true,
  categoryId: true,
});
