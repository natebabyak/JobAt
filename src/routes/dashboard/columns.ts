import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import z from 'zod';
import DataTableCheckbox from './data-table-checkbox.svelte';

export const Application = z.object({
	position: z.string().min(1).max(255),
	company: z.string().min(1).max(255),
	status: z.enum([
		'submitted',
		'preInterview',
		'interview',
		'offered',
		'accepted',
		'rejected',
		'withdrawn'
	]),
	submittedOn: z.date().optional(),
	preInterviewOn: z.date().optional(),
	interviewOn: z.date().optional(),
	offeredOn: z.date().optional(),
	acceptedOn: z.date().optional(),
	rejectedOn: z.date().optional(),
	withdrawnOn: z.date().optional()
});

export const columns: ColumnDef<z.infer<typeof Application>>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'position',
		header: 'Position'
	},
	{
		accessorKey: 'company',
		header: 'Company'
	},
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		id: 'actions'
	}
];
