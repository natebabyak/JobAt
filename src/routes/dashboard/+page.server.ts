import type { Application } from './columns';
import type { Actions, PageServerLoad } from './$types';
import type z from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = (event) => {
	if (!event.locals.user) {
		return redirect(302, '/sign-up');
	}

	const applications: z.infer<typeof Application>[] = [];

	return {
		applications
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
