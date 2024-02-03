import { relations } from 'drizzle-orm';
import { timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { products } from '..';

export const categories = pgTable('app_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
