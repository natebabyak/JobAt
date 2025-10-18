<script lang="ts">
	import { dateProxy } from 'sveltekit-superforms';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		today,
		type DateValue
	} from '@internationalized/date';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import type { ApplicationForm, ApplicationFormFieldName } from './schema.js';

	interface DateFieldProps {
		form: ApplicationForm;
		label: string;
		name: ApplicationFormFieldName;
	}
	const { form, label, name }: DateFieldProps = $props();

	const { form: formData } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function dateToCalendarDate(date: Date | undefined): DateValue | undefined {
		if (!date) return undefined;
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}

	let value = $state<DateValue | undefined>(
		dateToCalendarDate($formData[name] as Date | undefined)
	);
</script>

<Form.Field {form} {name}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Popover.Root>
				<Popover.Trigger {...props}>
					<Button variant="outline">
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
						<CalendarDays />
					</Button>
				</Popover.Trigger>
				<Popover.Content side="top" class="w-auto p-0">
					<Calendar
						type="single"
						bind:value
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel={label}
						captionLayout="dropdown"
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.FieldErrors />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
