<script lang="ts">
	import {
		CalendarIcon,
		HouseIcon,
		InboxIcon,
		PanelLeft,
		Plus,
		SearchIcon,
		SettingsIcon,
		User
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	const { open, setOpen, toggle } = useSidebar();

	const items = [
		{
			title: 'Home',
			url: '#',
			icon: HouseIcon
		},
		{
			title: 'Inbox',
			url: '#',
			icon: InboxIcon
		},
		{
			title: 'Calendar',
			url: '#',
			icon: CalendarIcon
		},
		{
			title: 'Search',
			url: '#',
			icon: SearchIcon
		},
		{
			title: 'Settings',
			url: '#',
			icon: SettingsIcon
		}
	];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Header>
			<div class="flex justify-between">
				{#if open}
					<Button href="/" size="icon" variant="ghost">
						<Jobat class="size-6 scale-100 group-hover/button:scale-0" />
						<PanelLeft class="absolute scale-0 group-hover/button:scale-100" />
					</Button>
				{:else}
					<Button onclick={toggle} size="icon" variant="ghost" class="group/button relative">
						<Jobat class="size-6 scale-100 group-hover/button:scale-0" />
						<PanelLeft class="absolute scale-0 group-hover/button:scale-100" />
					</Button>
				{/if}
			</div>
			{#if open}
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child()}
							<Button onclick={toggle} size="icon" variant="ghost" class="cursor-ew-resize">
								<PanelLeft />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>
						{open ? 'Close' : 'Open'} sidebar
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</Sidebar.Header>
		<Sidebar.Group>
			{#if open}
				<Sidebar.Header>
					<Button size="icon" variant="ghost">
						<Plus />
					</Button>
					<Button>Add application</Button>
				</Sidebar.Header>
			{/if}
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
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
	<Sidebar.Footer>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props}>
						<User />
						Account
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="right" align="end">
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item>Billing</DropdownMenu.Item>
					<DropdownMenu.Item>Team</DropdownMenu.Item>
					<DropdownMenu.Item>Subscription</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
