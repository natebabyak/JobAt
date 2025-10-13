<script lang="ts">
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Table2 from '@lucide/svelte/icons/table-2';

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
