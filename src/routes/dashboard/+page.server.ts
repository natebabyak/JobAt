import { applicationSchema } from './schema.js';
import { auth } from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const applications: Object[] = [];

	const form = await superValidate(zod4(applicationSchema));

	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	return {
		applications,
		form,
		session
	};
};
