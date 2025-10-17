<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Moon from '@lucide/svelte/icons/moon';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Sun from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
	import User from '@lucide/svelte/icons/user';
	import { authClient } from '$lib/auth-client';
	import { redirect } from '@sveltejs/kit';
</script>

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
				<DropdownMenu.Item closeOnSelect={false} onclick={toggleMode}>
					<Sun class="scale-100 rotate-0 !transition-transform dark:scale-0 dark:-rotate-90" />
					<Moon
						class="absolute scale-0 rotate-90 !transition-transform dark:scale-100 dark:rotate-0"
					/>
					Toggle Theme
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onclick={async () => {
						await authClient.signOut();
					}}
				>
					<LogOut />
					Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Sidebar.Footer>
