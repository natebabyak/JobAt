import type { SuperForm } from 'sveltekit-superforms';
import { z } from 'zod/v4';

export const applicationSchema = z.object({
	position: z.string().min(1).max(255),
	company: z.string().min(1).max(255),
	submittedOn: z.date(),
	assessmentReceivedOn: z.date().nullish(),
	interviewReceivedOn: z.date().nullish(),
	offerReceivedOn: z.date().nullish(),
	offerAcceptedOn: z.date().nullish(),
	rejectedOn: z.date().nullish(),
	withdrawnOn: z.date().nullish(),
	notes: z.string().max(2000).nullish()
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
export type ApplicationForm = SuperForm<ApplicationSchema, any>;
