<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import SidebarContent from './sidebar-content.svelte';
	import SidebarFooter from './sidebar-footer.svelte';
	import SidebarHeader from './sidebar-header.svelte';
</script>

<Sidebar.Root collapsible="icon" variant="floating">
	<SidebarHeader />
	<Sidebar.Separator />
	<SidebarContent />
	<Sidebar.Separator />
	<SidebarFooter />
	<Sidebar.Rail />
</Sidebar.Root>
