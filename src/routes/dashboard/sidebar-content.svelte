<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChartLine, Lightbulb, Plus, Table2 } from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

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

<Sidebar.Content>
	<Sidebar.Group>
		<Sidebar.GroupContent>
			<Sidebar.Menu>
				<Button>
					<Plus />
					Add Application
				</Button>
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
