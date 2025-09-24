import { pgTable } from 'drizzle-orm/pg-core';
import { db } from './index';

export async function getUserFromGitHubId() {
	const user = await db.select().from(users);
}
