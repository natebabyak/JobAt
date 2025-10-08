<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import { PanelLeft } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	const sidebar = Sidebar.useSidebar();
</script>

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
					<Tooltip.Content side="right">{sidebar.open ? 'Close' : 'Open'} Sidebar</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Header>
