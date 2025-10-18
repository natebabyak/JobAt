import type { SuperForm } from 'sveltekit-superforms';
import { z } from 'zod/v4';

const string = z.string().trim();

const date = z.coerce
	.date()
	.min(new Date('1900-01-01'), { error: 'Date cannot be before 1900' })
	.max(new Date(), { error: 'Date cannot be in the future' });

export const applicationSchema = z.object({
	jobTitle: string
		.min(1, { error: 'Job title is required' })
		.max(255, { error: 'Job title is too long (max 255 characters)' }),
	companyName: string
		.min(1, { error: 'Company name is required' })
		.max(255, { error: 'Company name is too long (max 255 characters)' }),
	submittedOn: date.default(new Date()),
	assessmentReceivedOn: date.optional(),
	interviewReceivedOn: date.optional(),
	offerReceivedOn: date.optional(),
	offerAcceptedOn: date.optional(),
	rejectedOn: date.optional(),
	withdrawnOn: date.optional(),
	notes: string.max(2000, { message: 'Notes is too long (max 2000 characters)' }).optional()
});

type ApplicationSchema = z.infer<typeof applicationSchema>;

export type ApplicationForm = SuperForm<ApplicationSchema, any>;

export type ApplicationFormFieldName = keyof ApplicationSchema;
