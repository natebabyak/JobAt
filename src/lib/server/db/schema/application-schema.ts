import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const application = pgTable('application', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	jobTitle: varchar('job_title').notNull(),
	companyName: varchar('company_name').notNull(),
	submittedOn: timestamp('submitted_on').notNull(),
	assessmentReceivedOn: timestamp('assessment_received_on'),
	interviewReceivedOn: timestamp('interview_received_on'),
	offeredReceivedOn: timestamp('offered_received_on'),
	offerAcceptedOn: timestamp('offer_accepted_on'),
	rejectedOn: timestamp('rejected_on'),
	withdrawnOn: timestamp('withdrawn_on'),
	notes: varchar('notes', { length: 2000 }),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});
