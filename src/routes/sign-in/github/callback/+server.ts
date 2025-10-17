import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/session';
import { github } from '$lib/server/oauth';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { db } from '$lib/server';
import { users } from '$lib/server/db/schema/tables';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState) {
		return new Response(null, {
			status: 400
		});
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch {
		return new Response(null, {
			status: 400
		});
	}

	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});

	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;

	const [existingUser] = await db.select().from(users).where(eq(users.githubId, githubUserId));

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);

		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}

	const [user] = await db
		.insert(users)
		.values({
			githubId: githubUserId,
			githubUsername: githubUsername
		})
		.returning({ id: users.id });

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);

	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(302, '/dashboard');
}
