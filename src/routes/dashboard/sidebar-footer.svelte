<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis, LogOut, Moon, Sun, User } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
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
