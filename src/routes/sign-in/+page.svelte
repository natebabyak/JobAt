<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import Github from '$lib/components/icons/github.svelte';
	import Google from '$lib/components/icons/google.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import type { PageProps } from './$types';
	import { schema } from './schema';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { authClient } from '$lib/auth-client';

	const { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4(schema)
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex h-screen items-center bg-radial from-[#7d7dff3f] to-[var(--background)]">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header class="grid gap-4">
			<Jobat class="mx-auto size-8" />
			<Card.Title class="mx-auto">Sign in to JobAt</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<form action="signIn" method="post" use:enhance class="grid gap-2">
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input
								{...props}
								autocomplete="email"
								placeholder="example@example.com"
								type="email"
								bind:value={$formData.email}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex justify-between">
								<Form.Label>Password</Form.Label>
								<a
									href="/forgot-password"
									class="text-xs text-muted-foreground underline-offset-4 hover:underline"
								>
									Forgot password?
								</a>
							</div>
							<Input
								autocomplete="current-password"
								bind:value={$formData.password}
								placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
								type="password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Sign in</Form.Button>
			</form>
			<div class="relative">
				<Separator />
				<span
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover px-2 text-xs font-medium text-muted-foreground"
				>
					or
				</span>
			</div>
			<div class="grid grid-cols-2 gap-2">
				<Button
					onclick={() => {
						authClient.signIn.social({
							provider: 'github',
							callbackURL: '/dashboard'
						});
					}}
					variant="outline"
				>
					<Github />
					GitHub
				</Button>
				<Button
					onclick={() => {
						authClient.signIn.social({
							provider: 'google',
							callbackURL: '/dashboard'
						});
					}}
					variant="outline"
				>
					<Google />
					Google
				</Button>
			</div>
		</Card.Content>
		<Card.Footer>
			<span class="w-full text-center text-xs text-muted-foreground">
				Don&apos;t have an account?
				<a href="/sign-up" class="underline-offset-4 hover:underline"> Sign up </a>
			</span>
		</Card.Footer>
	</Card.Root>
</main>
