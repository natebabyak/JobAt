import type { Application } from './columns';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';
import { schema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type z from 'zod';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/sign-up');
	}

	const applications: z.infer<typeof Application>[] = [];
	const form = await superValidate(zod4(schema));

	return {
		applications,
		form
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
