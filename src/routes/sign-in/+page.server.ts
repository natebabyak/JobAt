import { db } from '$lib/server/db/index.js';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import * as table from '$lib/server/db/schema/tables';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/session';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));

	return {
		form
	};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const results = await db.select().from(table.user).where(eq(table.user.email, email));

		const existingUser = results.at(0);

		if (!existingUser) {
			return fail(400, { message: 'Incorrect email address or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { message: 'Incorrect email address or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}
};
