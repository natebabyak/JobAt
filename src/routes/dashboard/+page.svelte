<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/layout/app-sidebar.svelte';
	import DataTable from './data-table.svelte';
	import { columns } from './columns.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - JobAt</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<DataTable data={data.applications} {columns} />
	</main>
</Sidebar.Provider>
