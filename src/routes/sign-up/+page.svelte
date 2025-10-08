<script lang="ts">
	import { AtSign, Eye, EyeOff } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
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
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils';

	const { data }: PageProps = $props();

	const showPassword = $state<boolean>(false);

	const form = superForm(data.form, {
		validators: zod4(schema)
	});

	const { form: formData, enhance } = form;
</script>

<svelte:head>
	<title>Sign Up - JobAt</title>
</svelte:head>

<main class="flex h-screen items-center bg-radial from-[#7d7dff3f] to-[var(--background)]">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header class="grid gap-4">
			<Jobat class="mx-auto size-8" />
			<Card.Title class="mx-auto">Sign up for JobAt</Card.Title>
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
							<Form.Label>Password</Form.Label>
							<ButtonGroup.Root class="w-full">
								<Input
									{...props}
									autocomplete="new-password"
									placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
									type="password"
									bind:value={$formData.password}
								/>
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props })}
											<Button {...props} size="icon" variant="outline">
												<EyeOff class={cn('')} />
												<Eye class={cn('')} />
											</Button>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>Add to library</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</ButtonGroup.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Sign up</Form.Button>
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
