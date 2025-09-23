<script lang="ts">
	import { AtSign } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import Github from '$lib/components/icons/github.svelte';
	import Google from '$lib/components/icons/google.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { PageProps } from './$types';
	import { schema } from './schema';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';

	const { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4(schema)
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex h-screen items-center">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header class="grid gap-4 text-center">
			<AtSign class="mx-auto" />
			<Card.Title>Sign up for JobAt</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<form action="signIn" method="post" use:enhance class="grid gap-2">
				<Form.Field {form} name="email">
					<Form.Control>
						<Form.Label>Email address</Form.Label>
						<Input bind:value={$formData.email} placeholder="example@domain.com" type="email" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						<Form.Label>Password</Form.Label>
						<Input
							bind:value={$formData.password}
							placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
							type="password"
						/>
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
				<Button href="/sign-in/github" variant="outline">
					<Github />
					GitHub
				</Button>
				<Button href="/sign-in/google" variant="outline">
					<Google />
					Google
				</Button>
			</div>
		</Card.Content>
		<Card.Footer>
			<span class="w-full text-center text-xs text-muted-foreground">
				Already have an account?
				<a href="/sign-in" class="underline-offset-4 hover:underline"> Sign in </a>
			</span>
		</Card.Footer>
	</Card.Root>
</main>
