import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const applicationLevel = pgEnum('application_level', [
	'intern',
	'entry-level',
	'junior',
	'mid-level',
	'senior',
	'staff',
	'principal',
	'distinguished',
	'fellow'
]);

const applicationLocation = pgEnum('application_location', ['on-site', 'hybrid', 'remote']);

const timestamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	deletedAt: timestamp('deleted_at')
};

export const applications = pgTable('applications', {
	id: serial('id').primaryKey(),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	position: varchar('position').notNull(),
	company: varchar('company').notNull(),
	submittedOn: timestamp('submitted_on', { mode: 'date', withTimezone: true }),
	screenedOn: timestamp('screening_on', { mode: 'date', withTimezone: true }),
	interviewingOn: timestamp('interviewing_on', { mode: 'date', withTimezone: true }),
	offeredOn: timestamp('offered_on', { mode: 'date', withTimezone: true }),
	acceptedOn: timestamp('accepted_on', { mode: 'date', withTimezone: true }),
	rejectedOn: timestamp('rejected_on', { mode: 'date', withTimezone: true }),
	withdrawnOn: timestamp('withdrawn_on', { mode: 'date', withTimezone: true }),
	canonicalizedCity: varchar('canonicalized_city'),
	normalizedPosition: varchar('normalized_position'),
	normalizedCompany: varchar('normalized_company'),
	level: applicationLevel('level'),
	location: applicationLocation('location'),
	skills: varchar().array().default([]),
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
