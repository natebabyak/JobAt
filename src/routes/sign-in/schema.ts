import { z } from 'zod/v4';

export const schema = z.object({
	email: z.email(),
	password: z.string()
});
