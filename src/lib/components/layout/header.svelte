<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Github from '$lib/components/icons/github.svelte';
	import {
		AtSign,
		Brain,
		Calendar,
		CalendarRange,
		ChartLine,
		Clock,
		Lightbulb,
		Link2,
		Table2
	} from '@lucide/svelte';
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
			href: '/dashboard#insights',
			Icon: Lightbulb,
			title: 'Insights',
			description: 'AI-enhanced insights to stay focused'
		},
		{
			href: '/dashboard',
			Icon: Link2,
			title: 'Table',
			description: 'View and edit your applications'
		},
		{
			href: '/dashboard#charts',
			Icon: ChartLine,
			title: 'Charts',
			description: 'Beautiful charts to visualize your data in a whole new way'
		},
		{
			href: '/dashboard',
			Icon: CalendarRange,
			title: 'Smart Filtering',
			description: 'View and edit your applications'
		},
		{
			href: '/dashboard#table',
			Icon: Table2,
			title: 'Table',
			description: 'View and edit your applications'
		},
		{
			href: '/dashboard',
			Icon: Link2,
			title: 'Autofill',
			description: 'Start tracking instantly with AI'
		}
	];

	const aboutLinks: NavLinkProps[] = [
		{
			href: 'https://github.com/natebabyak/JobAt',
			Icon: Github,
			title: 'GitHub',
			description: 'Repository'
		}
	];
</script>

{#snippet navLink({ href, Icon, title, description }: NavLinkProps)}
	<NavigationMenu.Link {href}>
		<div class="flex items-center gap-2">
			<div class="rounded-md border p-2">
				<Icon class="text-foreground" />
			</div>
			<div class="flex flex-col">
				<p class="font-medium">{title}</p>
				<p class="text-xs text-muted-foreground">{description}</p>
			</div>
		</div>
	</NavigationMenu.Link>
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
						<NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div class="grid w-[750px] grid-cols-3 gap-2 p-2">
								<NavigationMenu.Link
									href="/dashboard"
									class="row-span-4 flex flex-col justify-end gap-4"
								>
									<span class="text-lg font-medium">Dashboard</span>
									<span class="text-sm text-muted-foreground">
										Everything you need to know. All in one place.
									</span>
								</NavigationMenu.Link>
								<span class="text-xs font-medium text-muted-foreground">Sections</span>
								<span class="text-xs font-medium text-muted-foreground">Features</span>
								{#each dashboardLinks as dashboardLink}
									{@render navLink(dashboardLink)}
								{/each}
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<div class="grid w-[250px] gap-2 p-2">
								{#each aboutLinks as aboutLink}
									{@render navLink(aboutLink)}
								{/each}
							</div>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link>
							{#snippet child()}
								<a href="/pricing" class={navigationMenuTriggerStyle()}>Pricing</a>
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
