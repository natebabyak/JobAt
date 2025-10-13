<script lang="ts">
	import type { ApplicationForm } from '../../schema';
	import ApplicationsGroup from './applications-group.svelte';
	import FilteringGroup from './filtering-group.svelte';
	import NavigationGroup from './navigation-group.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { CalendarDate, getLocalTimeZone, now } from '@internationalized/date';

	let { form }: { form: ApplicationForm } = $props();
</script>

<Sidebar.Content>
	<ApplicationsGroup {form} />
	<NavigationGroup />
	<FilteringGroup
		initialStartValue={now(getLocalTimeZone())}
		initialEndValue={now(getLocalTimeZone())}
	/>
</Sidebar.Content>
