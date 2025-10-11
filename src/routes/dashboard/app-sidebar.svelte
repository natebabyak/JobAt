<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Moon from '@lucide/svelte/icons/moon';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import Plus from '@lucide/svelte/icons/plus';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Sun from '@lucide/svelte/icons/sun';
	import Table2 from '@lucide/svelte/icons/table-2';
	import { toggleMode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import User from '@lucide/svelte/icons/user';

	let { form } = $props();

	const { form: formData, enhance } = form;

	const sidebar = Sidebar.useSidebar();

	const isOpen = $derived(sidebar.open);

	const title = $derived(`${isOpen ? 'Close' : 'Open'} Sidebar`);

	const isMobile = new IsMobile().current;

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
</script>

{#snippet addApplicationForm()}
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

<Sidebar.Root collapsible="icon" variant="floating">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
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
						<Tooltip.Content side="right">{title}</Tooltip.Content>
					</Tooltip.Root>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Separator />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#if isMobile}
						<Drawer.Root>
							<Drawer.Trigger>
								{#snippet child({ props })}
									<Button {...props}>
										<Plus />
										Add application
									</Button>
								{/snippet}
							</Drawer.Trigger>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title>Add application</Drawer.Title>
								</Drawer.Header>
								{@render addApplicationForm()}
							</Drawer.Content>
						</Drawer.Root>
					{:else}
						<Dialog.Root>
							<Dialog.Trigger>
								{#snippet child({ props })}
									<Button {...props}>
										<Plus />
										Add application
									</Button>
								{/snippet}
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>Add application</Dialog.Title>
								</Dialog.Header>
								{@render addApplicationForm()}
							</Dialog.Content>
						</Dialog.Root>
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
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
	</Sidebar.Content>
	<Sidebar.Separator />
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
					<DropdownMenu.Item onclick={toggleMode} closeOnSelect={false}>
						<Sun class="scale-100 rotate-0 !transition-transform dark:scale-0 dark:-rotate-90" />
						<Moon
							class="absolute scale-0 rotate-90 !transition-transform dark:scale-100 dark:rotate-0"
						/>
						Toggle Theme
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<LogOut />
						Sign out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail {title} />
</Sidebar.Root>
