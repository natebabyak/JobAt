import type { Application } from './columns';
import type { PageServerLoad } from './$types';
import type z from 'zod';

export const load: PageServerLoad = () => {
	const applications: z.infer<typeof Application>[] = [];

	return {
		applications
	};
};
