import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./CellAction";
import { BillboardColumn } from "./types";

export const Columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
