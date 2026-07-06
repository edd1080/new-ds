import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: ReactNode;
  render: (row: T) => ReactNode;
  mono?: boolean;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
}

/** .data-table — mono uppercase thead, hover rows, no border on last row. */
export function DataTable<T>({ columns, rows, rowKey }: DataTableProps<T>) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)}>
            {columns.map((c, i) => (
              <td key={i} className={c.mono ? "td-mono" : undefined}>
                {c.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
