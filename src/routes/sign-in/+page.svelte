<script lang="ts">
	import Github from '$lib/components/icons/github.svelte';
	import Google from '$lib/components/icons/google.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { schema } from './schema';
	import { AtSign } from '@lucide/svelte';

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
			<Card.Title>Sign in to JobAt</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<form method="POST" use:enhance class="grid gap-2">
				<Form.Field {form} name="email">
					<Form.Control>
						<Form.Label>Email address</Form.Label>
						<Input bind:value={$formData.email} placeholder="example@domain.com" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						<div class="flex justify-between">
							<Form.Label>Password</Form.Label>
							<a href="/" class="text-xs text-muted-foreground underline-offset-4 hover:underline">
								Forgot password?
							</a>
						</div>
						<Input
							bind:value={$formData.password}
							placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
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
					OR
				</span>
			</div>
			<div class="grid grid-cols-2 gap-2">
				<Button variant="outline">
					<Github />
					GitHub
				</Button>
				<Button variant="outline">
					<Google />
					Google
				</Button>
			</div>
		</Card.Content>
		<Card.Footer>
			<span class="w-full text-center text-xs text-muted-foreground">
				Don&apos;t have an account? <a href="/sign-up" class="underline-offset-4 hover:underline"
					>Sign up</a
				>
			</span>
		</Card.Footer>
	</Card.Root>
</main>
