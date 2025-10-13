<script lang="ts">
	import type { ApplicationForm } from '../../schema';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let { form }: { form: ApplicationForm } = $props();

	const { form: formData, enhance } = form;

	const sidebar = Sidebar.useSidebar();
	const isMobile = new IsMobile().current;
</script>

{#snippet trigger({ ...props })}
	{#if sidebar.open}
		<Button {...props} class="w-full">
			<PlusIcon />
			Add Application
		</Button>
	{:else}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Sidebar.MenuButton {...props}>
					<PlusIcon />
					Add Application
				</Sidebar.MenuButton>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">
				<p>Add Application</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/if}
{/snippet}

{#snippet applicationForm()}
	<form action="addApplication" use:enhance method="post">
		<Form.Field {form} name="position">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Position</Form.Label>
					<Input
						{...props}
						placeholder="Software Engineer"
						type="text"
						bind:value={$formData.position}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="company">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Company</Form.Label>
					<Input {...props} placeholder="JobAt" type="text" bind:value={$formData.company} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex gap-2">
			<Form.Button>Submit</Form.Button>
			<Form.Button variant="outline">Cancel</Form.Button>
		</div>
	</form>
{/snippet}

<Sidebar.Group>
	<Sidebar.GroupLabel>Applications</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		{#if isMobile}
			<Drawer.Root>
				<Drawer.Trigger>
					{#snippet child({ props })}
						{@render trigger(props)}
					{/snippet}
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Add application</Drawer.Title>
					</Drawer.Header>
					{@render applicationForm()}
				</Drawer.Content>
			</Drawer.Root>
		{:else}
			<Dialog.Root>
				<Dialog.Trigger>
					{#snippet child({ props })}
						{@render trigger(props)}
					{/snippet}
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Add application</Dialog.Title>
					</Dialog.Header>
					{@render applicationForm()}
				</Dialog.Content>
			</Dialog.Root>
		{/if}
	</Sidebar.GroupContent>
</Sidebar.Group>
