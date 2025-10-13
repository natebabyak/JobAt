<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CalendarArrowDownIcon from '@lucide/svelte/icons/calendar-arrow-down';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let {
		initialStartValue,
		initialEndValue
	}: {
		initialStartValue: DateValue;
		initialEndValue: DateValue;
	} = $props();

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let startValue = $state<DateValue>(initialStartValue);
	let endValue = $state<DateValue>(initialEndValue);

	const sidebar = Sidebar.useSidebar();
	const isOpen = $derived(sidebar.open);
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Filtering</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					{#if isOpen}
						<Button {...props} variant="outline" class="w-full justify-start">
							<CalendarArrowDownIcon />
							{df.format(startValue.toDate(getLocalTimeZone()))}
						</Button>
					{:else}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Sidebar.MenuButton {...props}>
									<CalendarArrowDownIcon />
									Start Date
								</Sidebar.MenuButton>
							</Tooltip.Trigger>
							<Tooltip.Content side="right">
								<p>Start Date</p>
							</Tooltip.Content>
						</Tooltip.Root>
					{/if}
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar type="single" bind:value={startValue} />
			</Popover.Content>
		</Popover.Root>
	</Sidebar.GroupContent>
</Sidebar.Group>
