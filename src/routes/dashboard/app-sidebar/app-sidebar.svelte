<script lang="ts">
	import type { ApplicationForm } from '../schema';
	import Content from './content/content.svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { form }: { form: ApplicationForm } = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Root collapsible="icon" variant="floating">
	<Header />
	<Content {form} />
	<Footer />
	<Sidebar.Rail title={`${sidebar.open ? 'Close' : 'Open'} Sidebar`} />
</Sidebar.Root>
