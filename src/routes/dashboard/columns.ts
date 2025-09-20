import type { ColumnDef } from '@tanstack/table-core';
import z from 'zod';

export const Application = z.object({
	position: z.string().min(1).max(255),
	company: z.string().min(1).max(255),
	status: z.enum(['submitted', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn']),
	submittedOn: z.date(),
	interviewingOn: z.date().optional(),
	offeredOn: z.date().optional(),
	acceptedOn: z.date().optional(),
	rejectedOn: z.date().optional(),
	withdrawnOn: z.date().optional()
});

export const columns: ColumnDef<z.infer<typeof Application>>[] = [
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'amount',
		header: 'Amount'
	}
];
