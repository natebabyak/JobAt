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

const applicationLocationType = pgEnum('application_location_type', ['hybrid', 'onsite', 'remote']);

export const skills = pgTable('skills', {});

export const applications = pgTable('applications', {
	id: serial('id').primaryKey(),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	title: varchar('title').notNull(),
	company: varchar('company').notNull(),
	submittedOn: timestamp('submitted_on', { mode: 'date', withTimezone: true }),
	preInterviewOn: timestamp('pre_interview_on', { mode: 'date', withTimezone: true }),
	interviewOn: timestamp('interview_on', { mode: 'date', withTimezone: true }),
	offeredOn: timestamp('offered_on', { mode: 'date', withTimezone: true }),
	acceptedOn: timestamp('accepted_on', { mode: 'date', withTimezone: true }),
	rejectedOn: timestamp('rejected_on', { mode: 'date', withTimezone: true }),
	withdrawnOn: timestamp('withdrawn_on', { mode: 'date', withTimezone: true }),
	normalizedTitle: varchar('normalized_title'),
	canonicalizedCompany: varchar('normalized_company'),
	seniority: applicationLevel('level'),
	locationType: applicationLocationType(),
	skills: varchar('skills').array().default([]),
	city: varchar('city'),
	state: varchar('state'),
	country: varchar('country'),
	notes: text('notes'),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
	deletedAt: timestamp('deleted_at', { mode: 'date', withTimezone: true })
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
	emailAddress: varchar('email_address').unique(),
	passwordHash: varchar('password_hash'),
	githubId: integer('github_id').unique(),
	githubUsername: text('github_username'),
	googleId: text('google_id').unique(),
	googleUserame: text('google_username'),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull()
});

export type Application = typeof applications.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
