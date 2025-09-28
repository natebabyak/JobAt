<script lang="ts">
	import {
		CalendarIcon,
		HouseIcon,
		InboxIcon,
		PanelLeft,
		SearchIcon,
		SettingsIcon
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	const { open, toggle } = useSidebar();

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
				<Button href="/" size="icon" variant="ghost">
					<Jobat class="size-6" />
				</Button>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button onclick={toggle} size="icon" variant="ghost" class="cursor-ew-resize">
							<PanelLeft />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						{open ? 'Close' : 'Open'} sidebar
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Sidebar.Header>
		<Sidebar.Group>
			<Sidebar.Header>
				<Button>Add application</Button>
			</Sidebar.Header>
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
</Sidebar.Root>
