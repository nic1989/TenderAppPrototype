"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Tender } from "../../types/tender.types";
import TenderRowActions from "./tender-row-actions";
import { formatDate } from "@/utils/utilities";
import { getStatusColor } from "@/components/icons/badge-class";
import TenderCellTitle from "./tender-cell-title";

export const columns: ColumnDef<Tender, unknown>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => <TenderCellTitle title={row?.original?.title} id={row?.original?.id} />
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => <div className={`text-center w-[100px] rounded-3xl p-2 font-medium ${getStatusColor(row.original.status)}`}>{row.original.status}</div>
  },
  {
    id: "documents",
    header: "Documents",
    cell: ({ row }) => `${row.original.documents.length} Document(s)`,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }:any) => <TenderRowActions tender={row.original} />,
    meta: {
      className: "text-center",
    }
  }
];