import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
};

export const applications = pgTable('applications', {
	position: varchar('position'),
	company: varchar('company'),
	submittedOn: timestamp('submitted_on', { mode: 'date', withTimezone: true }),
	screenedOn: timestamp('screening_on', { mode: 'date', withTimezone: true }),
	interviewingOn: timestamp('interviewing_on', { mode: 'date', withTimezone: true }),
	offeredOn: timestamp('offered_on', { mode: 'date', withTimezone: true }),
	acceptedOn: timestamp('accepted_on', { mode: 'date', withTimezone: true }),
	rejectedOn: timestamp('rejected_on', { mode: 'date', withTimezone: true }),
	withdrawnOn: timestamp('withdrawn_on', { mode: 'date', withTimezone: true }),
	...timestamps
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	emailAddress: text('email_address').unique(),
	passwordHash: text('password_hash'),
	githubId: integer('github_id').unique(),
	githubUsername: text('github_username'),
	googleId: text('google_id').unique(),
	googleUserame: text('google_username'),
	...timestamps
});

export type Application = typeof applications.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
