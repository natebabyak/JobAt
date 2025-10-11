<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { columns } from './columns.js';
	import type { PageProps } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from './app-sidebar.svelte';
	import DataTable from './data-table.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4(schema)
	});
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
	<AppSidebar {form} />
	<main class="grid w-full bg-radial from-[#7d7dff3f] to-[var(--background)] p-4">
		<h1 class="text-2xl font-light">JobAt</h1>
		<div class="grid grid-cols-3">
			{#each { length: 6 } as insight}
				{@render insightCard()}
			{/each}
		</div>
		<DataTable data={data.applications} {columns} />
	</main>
</Sidebar.Provider>
