<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getLocalTimeZone, DateFormatter, type DateValue, today } from '@internationalized/date';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Moon from '@lucide/svelte/icons/moon';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import Sun from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import User from '@lucide/svelte/icons/user';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import CalendarArrowDown from '@lucide/svelte/icons/calendar-arrow-down';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Table2 from '@lucide/svelte/icons/table-2';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import type { ApplicationForm } from './schema';
	import CalendarArrowUp from '@lucide/svelte/icons/calendar-arrow-up';

	const items = [
		{
			url: '/dashboard#insights',
			icon: Lightbulb,
			title: 'Insights'
		},
		{
			url: '/dashboard#charts',
			icon: ChartLine,
			title: 'Charts'
		},
		{
			url: '/dashboard#table',
			icon: Table2,
			title: 'Table'
		}
	];

	let { form }: { form: ApplicationForm } = $props();

	const { form: formData, enhance } = form;

	let startDate = $state<DateValue>(today(getLocalTimeZone()));
	let endDate = $state<DateValue>(today(getLocalTimeZone()));

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	const sidebar = Sidebar.useSidebar();
	const isOpen = $derived(sidebar.open);
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
					<Form.Label>Company</Form.Label>
					<Input {...props} placeholder="JobAt" type="text" bind:value={$formData.companyName} />
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

<Sidebar.Root collapsible="icon" class="bg-gradient-to-r">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				{#if sidebar.open}
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
						<Tooltip.Content side="right">{sidebar.open ? 'Close' : 'Open'} Sidebar</Tooltip.Content
						>
					</Tooltip.Root>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
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
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a {...props} href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Start Date</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							{#if isOpen}
								<Button {...props} variant="outline" class="w-full justify-start">
									<CalendarArrowDown />
									{df.format(startDate.toDate(getLocalTimeZone()))}
								</Button>
							{:else}
								<Tooltip.Root>
									<Tooltip.Trigger>
										<Sidebar.MenuButton {...props}>
											<CalendarArrowDown />
											Start Date
										</Sidebar.MenuButton>
									</Tooltip.Trigger>
									<Tooltip.Content side="right">Start Date</Tooltip.Content>
								</Tooltip.Root>
							{/if}
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0">
						<Calendar type="single" bind:value={startDate} />
					</Popover.Content>
				</Popover.Root>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>End Date</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							{#if isOpen}
								<Button {...props} variant="outline" class="w-full justify-start">
									<CalendarArrowUp />
									{df.format(endDate.toDate(getLocalTimeZone()))}
								</Button>
							{:else}
								<Tooltip.Root>
									<Tooltip.Trigger>
										<Sidebar.MenuButton {...props}>
											<CalendarArrowUp />
											End Date
										</Sidebar.MenuButton>
									</Tooltip.Trigger>
									<Tooltip.Content side="right">End Date</Tooltip.Content>
								</Tooltip.Root>
							{/if}
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0">
						<Calendar type="single" bind:value={endDate} />
					</Popover.Content>
				</Popover.Root>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props}>
						<User />
						Account
						<Ellipsis class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" side="right">
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
						onclick={async () => {
							await authClient.signOut();
						}}
					>
						<LogOut />
						Sign out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail title={`${sidebar.open ? 'Close' : 'Open'} Sidebar`} />
</Sidebar.Root>
