import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { applicationSchema, type ApplicationSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/sign-up');
	}

	const applications: ApplicationSchema[] = [];
	const applicationForm = await superValidate(zod4(applicationSchema));

	return {
		applications,
		applicationForm
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}

		await invalidateSession(event.locals.session.id);

		deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
};
