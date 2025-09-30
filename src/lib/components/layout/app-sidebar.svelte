<script lang="ts">
	import { ChartLine, Lightbulb, LogOut, PanelLeft, Plus, Table2, User } from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	const sidebar = Sidebar.useSidebar();

	const navigationItems = [
		{
			href: 'insights',
			Icon: Lightbulb
		},
		{
			href: 'charts',
			Icon: ChartLine
		},
		{
			href: 'table',
			Icon: Table2
		}
	];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Header>
			<div class="flex justify-between">
				{#if sidebar.open}
					<Button href="/" size="icon" variant="ghost">
						<Jobat class="size-6" />
					</Button>
				{:else}
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									{...props}
									onclick={sidebar.toggle}
									size="icon"
									variant="ghost"
									class="group/button relative cursor-ew-resize"
								>
									<Jobat class="size-6 scale-100 transition-transform group-hover/button:scale-0" />
									<PanelLeft
										class="absolute scale-0 transition-transform group-hover/button:scale-100"
									/>
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content side="right">Open Sidebar</Tooltip.Content>
					</Tooltip.Root>
				{/if}
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								onclick={sidebar.toggle}
								size="icon"
								variant="ghost"
								class="cursor-ew-resize"
							>
								<PanelLeft />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Close Sidebar</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Sidebar.Header>
		<Sidebar.Group>
			<Sidebar.Header>
				<Button>
					<Plus />
					Add application
				</Button>
			</Sidebar.Header>
			<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navigationItems as { href, Icon }}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a {...props} href={`dashboard#${href}`}>
										<Icon />
										<span class="capitalize">{href}</span>
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
			<DropdownMenu.Content align="end" side="right">
				<DropdownMenu.Group>
					<DropdownMenu.Label>Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<LogOut />
						Sign out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail title={`${sidebar.open ? 'Close' : 'Open'} sidebar`} />
</Sidebar.Root>
