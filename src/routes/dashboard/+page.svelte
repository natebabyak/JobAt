<script lang="ts">
	import AppSidebar from '$lib/components/layout/app-sidebar.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { columns } from './columns.js';
	import DataTable from './data-table.svelte';
	import type { PageProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - JobAt</title>
</svelte:head>

{#snippet insightCard()}
	<Card.Root>
		<Card.Header>
			<Card.Title>Title</Card.Title>
			<Card.Description>Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
{/snippet}

<Sidebar.Provider>
	<AppSidebar />
	<main class="grid w-full p-4">
		<h1 class="text-2xl font-light">JobAt</h1>
		<DataTable data={data.applications} {columns} />
	</main>
</Sidebar.Provider>
