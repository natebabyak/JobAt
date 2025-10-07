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
	import { mode, setMode } from 'mode-watcher';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';

	const theme = $derived(mode.current ?? 'system');

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
			<div class="flex justify-between">
				{#if sidebar.open}
					<Button href="/" size="icon" variant="ghost">
						<Jobat />
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
					<DropdownMenu.RadioGroup
						value={theme}
						onValueChange={(theme) => setMode(theme as 'light' | 'dark' | 'system')}
					>
						<DropdownMenu.RadioItem value="light">
							Light
							<Sun class="ml-auto" />
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="dark">
							Dark
							<Moon class="ml-auto" />
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="system">
							System
							<Monitor class="ml-auto" />
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
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
