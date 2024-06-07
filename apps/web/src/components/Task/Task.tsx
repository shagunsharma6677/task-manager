'use client';

import API from '@/lib/API';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { CreateTaskDialog } from './CreateTaskDialog';
import { EditTaskDialog } from './EditTaskDialog';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

// Updated data array with Task objects
const data: Task[] = [
  {
    id: 'm5gr84i9',
    title: 'Task 1',
    description: 'Description for Task 1',
    status: 'success',
  },
  {
    id: '3u1reuv4',
    title: 'Task 2',
    description: 'Description for Task 2',
    status: 'success',
  },
  {
    id: 'derv1ws0',
    title: 'Task 3',
    description: 'Description for Task 3',
    status: 'processing',
  },
  {
    id: '5kma53ae',
    title: 'Task 4',
    description: 'Description for Task 4',
    status: 'success',
  },
  {
    id: 'bhqecj4p',
    title: 'Task 5',
    description: 'Description for Task 5',
    status: 'failed',
  },
];

export function Task() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const getAllTask = async () => {
    try {
      const { data }: any = await API.get('/api/tasks/getAll');
      console.log(data.data);
      setTasks(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };
  const columns: ColumnDef<Task>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border border-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border border-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: () => <div className="text-left text-white">Title</div>,
      cell: ({ row }) => (
        <div className="capitalize text-white">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-white"
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('description')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-right text-white">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium text-white">
            {row.getValue('status')}
          </div>
        );
      },
    },

    {
      accessorKey: 'actions',
      header: () => <div className="text-center text-white">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium flex gap-2 justify-center text-white">
            <CreateTaskDialog onUpdate={getAllTask}>
              <Button>Create</Button>
            </CreateTaskDialog>
            <EditTaskDialog editInfo={row.original} onUpdate={getAllTask}>
              <Button>Edit</Button>
            </EditTaskDialog>

            <Button onClick={() => handleDelete(row.original)}>Delete</Button>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (rowData: any) => {
    try {
      const data = await API.delete(`/api/tasks/${rowData?._id}/delete`);
      getAllTask();
    } catch (err) {
      console.log(err);
    }
  };

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="w-full ">
      <div className="flex items-center md:py-4 sm:py-1">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-zinc-900 text-white"
        />
      </div>
      <div className="rounded-md bg-neutral-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="bg-zinc-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
