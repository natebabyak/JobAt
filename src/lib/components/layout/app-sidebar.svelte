<script lang="ts">
	import {
		ChartLine,
		Computer,
		Ellipsis,
		Gauge,
		Lightbulb,
		LogOut,
		Monitor,
		Moon,
		PanelLeft,
		Plus,
		Sun,
		Table2,
		User
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Jobat from '$lib/components/icons/jobat.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { mode, toggleMode } from 'mode-watcher';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';

	const sidebar = Sidebar.useSidebar();

	const navigationItems = [
		{
			icon: Gauge,
			label: 'Dashboard',
			items: [
				{
					href: '/dashboard/#insights',
					icon: Lightbulb,
					label: 'Insights'
				},
				{
					href: '/dashboard#charts',
					icon: ChartLine,
					label: 'Charts'
				},
				{
					href: '/dashboard#table',
					icon: Table2,
					label: 'Table'
				}
			]
		}
	];
</script>

<Sidebar.Root collapsible="icon" variant="floating">
	<Sidebar.Content>
		<Sidebar.Header>
			{#if sidebar.open}
				<div class="flex justify-between">
					<Button href="/" size="icon" variant="ghost">
						<Jobat class="size-6" />
					</Button>
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
								<Jobat class="scale-100 transition-transform group-hover/button:scale-0" />
								<PanelLeft
									class="absolute scale-0 transition-transform group-hover/button:scale-100"
								/>
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Open Sidebar</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</Sidebar.Header>
		<Sidebar.Group>
			<Sidebar.Header>
				<Button>
					<Plus />
					Add application
				</Button>
			</Sidebar.Header>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				{#each navigationItems as navigationItem}
					<Sidebar.Menu>
						<Collapsible.Root open class="group/collapsible">
							<Sidebar.MenuItem>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton {...props}>
											<navigationItem.icon />
											{navigationItem.label}
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each navigationItem.items as item}
											<Sidebar.MenuSubItem>
												{item.label}
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							</Sidebar.MenuItem>
						</Collapsible.Root>
					</Sidebar.Menu>
				{/each}
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
	<Sidebar.Rail title={`${sidebar.open ? 'Close' : 'Open'} Sidebar`} />
</Sidebar.Root>
