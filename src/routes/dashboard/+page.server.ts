import type z from 'zod';
import type { Application } from './columns';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const applications: z.infer<typeof Application>[] = [];

	return {
		applications
	};
};
