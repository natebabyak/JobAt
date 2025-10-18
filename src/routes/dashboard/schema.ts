import type { SuperForm } from 'sveltekit-superforms';
import { z } from 'zod/v4';

export const applicationSchema = z.object({
	jobTitle: z
		.string()
		.min(1, { message: 'Job title is too short (min 1 character)' })
		.max(255, { message: 'Job title is too long (max 255 characters)' }),
	companyName: z
		.string()
		.min(1, { message: 'Company name is too short (min 1 character)' })
		.max(255, { message: 'Company name is too long (max 255 characters)' }),
	submittedOn: z.date(),
	assessmentReceivedOn: z.date().nullish(),
	interviewReceivedOn: z.date().nullish(),
	offerReceivedOn: z.date().nullish(),
	offerAcceptedOn: z.date().nullish(),
	rejectedOn: z.date().nullish(),
	withdrawnOn: z.date().nullish(),
	notes: z.string().max(2000, { message: 'Notes is too long (max 2000 characters)' }).nullish()
});

export type ApplicationForm = SuperForm<z.infer<typeof applicationSchema>, any>;
