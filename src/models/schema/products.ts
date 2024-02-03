import { relations } from 'drizzle-orm';
import { timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { categories } from '..';

export const products = pgTable('app_products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  price: text('price').notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  categories: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
