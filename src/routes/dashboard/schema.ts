import { z } from 'zod/v4';

export const schema = z.object({
	position: z.string().min(1).max(255),
	company: z.string().min(1).max(255),
	submittedOn: z.date(),
	assessmentReceivedOn: z.date().optional(),
	interviewReceivedOn: z.date().optional(),
	offerReceivedOn: z.date().optional(),
	offerAcceptedOn: z.date().optional(),
	rejectedOn: z.date().optional(),
	withdrawnOn: z.date().optional(),
	notes: z.string().optional()
});
