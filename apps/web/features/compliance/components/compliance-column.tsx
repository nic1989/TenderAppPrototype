"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComplianceCheck } from "../types/compliance.types";
import ComplianceStatus from "./compliance-status";

export const columns: ColumnDef<ComplianceCheck, unknown>[] = [
  {
    accessorKey: "requirement",
    header: "Requirement"
  },
  {
    accessorKey: "companyValue",
    header: "Company Value"
  },
  {
    id: "status",
    header: "Status",
    cell: ({row}) => <ComplianceStatus status={row.original.status} />
  },
  {
    accessorKey: "remarks",
    header: "Remarks"
  }
];