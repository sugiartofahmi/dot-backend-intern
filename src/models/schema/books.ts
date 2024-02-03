import { relations } from 'drizzle-orm';
import { timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from '..';

export const books = pgTable('app_bookss', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  authorId: uuid('author_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const booksRelations = relations(books, ({ one }) => ({
  users: one(users, {
    fields: [books.authorId],
    references: [users.id],
  }),
}));
