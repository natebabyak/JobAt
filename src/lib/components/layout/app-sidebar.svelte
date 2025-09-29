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
					<Button href="/" size="icon" variant="ghost" class={cn(!open && 'hidden')}>
						<Jobat class="size-6" />
					</Button>
				{:else}
					<Button href="/" size="icon" variant="ghost" class={cn(open && 'hidden')}>
						<PanelLeft class="size-6" />
					</Button>
				{/if}
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
			</div>
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
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<div {...props}>
											<User />
											Account
										</div>
									{/snippet}
								</Sidebar.MenuButton>
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
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
