<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Github from '$lib/components/icons/github.svelte';
	import { AtSign, ChartLine, Lightbulb, Table2 } from '@lucide/svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { navigationMenuTriggerStyle } from '../ui/navigation-menu/navigation-menu-trigger.svelte';
	import type { Component } from 'svelte';

	interface NavLinkProps {
		href: string;
		Icon: Component;
		title: string;
		description: string;
	}

	const dashboardLinks: NavLinkProps[] = [
		{
			href: '/dashboard#charts',
			Icon: ChartLine,
			title: 'Charts',
			description: 'Visualize your applications'
		},
		{
			href: '/dashboard#insights',
			Icon: Lightbulb,
			title: 'Insights',
			description: 'Learn more about your applications'
		},
		{
			href: '/dashboard#table',
			Icon: Table2,
			title: 'Table',
			description: 'View and edit your applications'
		}
	];
</script>

{#snippet navLink({ href, Icon, title, description }: NavLinkProps)}
	<li>
		<NavigationMenu.Link {href}>
			<div class="flex items-center gap-2">
				<div class="rounded-md border p-2">
					<Icon class="text-foreground" />
				</div>
				<div class="flex flex-col">
					<span>{title}</span>
					<span class="text-xs text-muted-foreground">{description}</span>
				</div>
			</div>
		</NavigationMenu.Link>
	</li>
{/snippet}

<header class="fixed w-full p-4">
	<div class="mx-auto flex max-w-7xl justify-between">
		<div class="flex gap-2">
			<Button href="/" size="icon" variant="ghost">
				<AtSign />
			</Button>
			<NavigationMenu.Root viewport={true}>
				<NavigationMenu.List>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>Dashboard</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid w-[500px] grid-cols-2 gap-2 p-2">
								{#each dashboardLinks as dashboardLink}
									{@render navLink(dashboardLink)}
								{/each}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>AI</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid w-[500px] grid-cols-2 gap-2 p-2">
								{#each dashboardLinks as dashboardLink}
									{@render navLink(dashboardLink)}
								{/each}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>About</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul class="grid w-[500px] grid-cols-2 gap-2 p-2">
								{#each dashboardLinks as dashboardLink}
									{@render navLink(dashboardLink)}
								{/each}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link>
							{#snippet child()}
								<a href="/pricing" class={navigationMenuTriggerStyle()}> Pricing </a>
							{/snippet}
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
		<div class="flex gap-2">
			<Button href="/sign-in" variant="outline">Sign in</Button>
			<Button href="/sign-up">Sign up</Button>
		</div>
	</div>
</header>
