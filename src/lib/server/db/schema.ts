import {
	integer,
	numeric,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

const Seniority = pgEnum('application_seniority', [
	'intern',
	'entry',
	'junior',
	'intemediate',
	'senior',
	'staff',
	'principal',
	'distinguished',
	'fellow'
]);

const Arrangement = pgEnum('application_location_type', ['onsite', 'hybrid', 'remote']);

const SalaryPeriod = pgEnum('salary_period', ['hourly', 'daily', 'weekly', 'monthly', 'annually']);

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
	seniority: Seniority('seniority'),
	arrangement: Arrangement('arrangement'),
	salary: numeric('salary'),
	salaryMin: numeric('salary_min'),
	salaryMax: numeric('salary_max'),
	salaryCurrency: varchar('salary_currency', { length: 3 }),
	salaryPeriod: SalaryPeriod('salary_period'),
	city: varchar('city'),
	state: varchar('state'),
	country: varchar('country'),
	notes: text('notes'),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull()
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
	email: varchar('email').unique(),
	passwordHash: varchar('password_hash'),
	githubId: integer('github_id').unique(),
	githubUsername: varchar('github_username'),
	googleId: varchar('google_id').unique(),
	googleUsername: varchar('google_username'),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull()
});

export type Application = typeof applications.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
