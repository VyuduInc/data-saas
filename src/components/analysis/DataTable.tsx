import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@tremor/react';
import { DataPoint } from '@/lib/types';

interface DataTableProps {
  data: DataPoint[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Label</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
          <TableHeaderCell>Timestamp</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((point) => (
          <TableRow key={point.id}>
            <TableCell>{point.label}</TableCell>
            <TableCell>{point.value}</TableCell>
            <TableCell>
              {point.timestamp?.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}