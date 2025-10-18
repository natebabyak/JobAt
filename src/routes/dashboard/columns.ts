import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableCheckbox from './data-table-checkbox.svelte';
import type { Schema } from './schema.js';

export const columns: ColumnDef<Schema>[] = [
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
		accessorKey: 'jobTitle',
		header: 'Job Title'
	},
	{
		accessorKey: 'companyName',
		header: 'Company Name'
	},
	{
		accessorKey: 'submittedOn',
		header: 'Submitted On'
	},
	{
		id: 'actions'
	}
];
