import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	githubId: integer('github_id'),
	username: text('username'),
	googleId: text('google_id'),
	name: text('name'),
	email: text('email'),
	passwordHash: text('password_hash')
});

export const sessions = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;
