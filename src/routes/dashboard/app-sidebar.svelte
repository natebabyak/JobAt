<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CalendarDate, getLocalTimeZone, DateFormatter } from '@internationalized/date';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Moon from '@lucide/svelte/icons/moon';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import Sun from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import User from '@lucide/svelte/icons/user';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Table2 from '@lucide/svelte/icons/table-2';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import type { ApplicationForm } from './schema.js';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import DateField from './date-field.svelte';

	const items = [
		{
			href: '/dashboard#insights',
			Icon: Lightbulb,
			label: 'Insights'
		},
		{
			href: '/dashboard#charts',
			Icon: ChartLine,
			label: 'Charts'
		},
		{
			href: '/dashboard#table',
			Icon: Table2,
			label: 'Table'
		}
	];

	let { form }: { form: ApplicationForm } = $props();

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	const sidebar = Sidebar.useSidebar();
	const isOpen = $derived(sidebar.open);
	const isMobile = new IsMobile().current;
</script>

{#snippet addApplicationTrigger({ ...props })}
	{#if isOpen}
		<Sidebar.MenuButton {...props}>
			<SquarePen />
			New application
		</Sidebar.MenuButton>
	{:else}
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Sidebar.MenuButton {...props}>
					<SquarePen />
					New application
				</Sidebar.MenuButton>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">New application</Tooltip.Content>
		</Tooltip.Root>
	{/if}
{/snippet}

{#snippet addApplicationForm()}
	<form action="addApplication" use:enhance method="post" class="grid gap-2">
		<Form.Field {form} name="jobTitle">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Job Title</Form.Label>
					<Input
						{...props}
						placeholder="Software Engineer"
						type="text"
						bind:value={$formData.jobTitle}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="companyName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Company Name</Form.Label>
					<Input {...props} placeholder="JobAt" type="text" bind:value={$formData.companyName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<DateField {form} label="Submitted On" name="submittedOn" />
		<div class="flex gap-2">
			<Form.Button>Submit</Form.Button>
			<Form.Button variant="outline">Cancel</Form.Button>
		</div>
	</form>
{/snippet}

<Sidebar.Root collapsible="icon" class="bg-gradient-to-r">
	<Sidebar.Header>
		{#if isOpen}
			<div class="flex justify-between">
				<Button href="/" size="icon" variant="ghost">
					<Jobat class="size-8" />
				</Button>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button {...props} onclick={sidebar.toggle} size="icon" variant="ghost">
								<PanelLeft />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Close Sidebar</Tooltip.Content>
				</Tooltip.Root>
			</div>
		{:else}
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton {...props} onclick={sidebar.toggle} class="group/button">
							<Jobat
								class="size-8 scale-200 transition-transform group-hover/button:scale-0 group-hover/button:rotate-90"
							/>
							<PanelLeft
								class="absolute scale-0 transition-transform group-hover/button:scale-100"
							/>
						</Sidebar.MenuButton>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content side="right">{isOpen ? 'Close' : 'Open'} Sidebar</Tooltip.Content>
			</Tooltip.Root>
		{/if}
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						{#if isMobile}
							<Drawer.Root>
								<Drawer.Trigger>
									{#snippet child({ props })}
										{@render addApplicationTrigger(props)}
									{/snippet}
								</Drawer.Trigger>
								<Drawer.Content>
									<Drawer.Header>
										<Drawer.Title>Add Application</Drawer.Title>
									</Drawer.Header>
									{@render addApplicationForm()}
								</Drawer.Content>
							</Drawer.Root>
						{:else}
							<Dialog.Root>
								<Dialog.Trigger>
									{#snippet child({ props })}
										{@render addApplicationTrigger(props)}
									{/snippet}
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Add Application</Dialog.Title>
									</Dialog.Header>
									{@render addApplicationForm()}
								</Dialog.Content>
							</Dialog.Root>
						{/if}
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as { href, Icon, label }}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									{#if isOpen}
										<a {...props} {href}>
											<Icon />
											{label}
										</a>
									{:else}
										<Tooltip.Root>
											<Tooltip.Trigger {...props}>
												{#snippet child({ props })}
													<a {...props} {href}>
														<Icon />
														{label}
													</a>
												{/snippet}
											</Tooltip.Trigger>
											<Tooltip.Content side="right">{label}</Tooltip.Content>
										</Tooltip.Root>
									{/if}
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props} size="lg">
						<User />
						Account
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="center" side="top">
				<DropdownMenu.Group>
					<DropdownMenu.Label>Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item closeOnSelect={false} onclick={toggleMode}>
						<Sun class="scale-100 rotate-0 !transition-transform dark:scale-0 dark:-rotate-90" />
						<Moon
							class="absolute scale-0 rotate-90 !transition-transform dark:scale-100 dark:rotate-0"
						/>
						Toggle Theme
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item
						onclick={() => {
							authClient.signOut();
						}}
					>
						<LogOut />
						Sign out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail title={`${isOpen ? 'Close' : 'Open'} Sidebar`} />
</Sidebar.Root>
