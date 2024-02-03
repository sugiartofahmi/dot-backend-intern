import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { books } from '..';
export const users = pgTable('app_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  fullname: text('fullname').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  books: many(books),
}));
