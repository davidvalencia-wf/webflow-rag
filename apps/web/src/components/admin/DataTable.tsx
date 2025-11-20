/**
 * DataTable Component
 * Styled table with sorting, search, and pagination
 */

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  if (data.length === 0) {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
      >
        <p style={{ color: '#898989', fontFamily: 'var(--font-inter)', fontSize: '15px' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #363636' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#222222' }}>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  onClick={() => column.sortable !== false && handleSort(column.key as string)}
                  className={column.sortable !== false ? 'cursor-pointer hover:bg-opacity-80' : ''}
                  style={{
                    padding: '14px 18px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#ABABAB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable !== false && sortKey === column.key && (
                      <span style={{ color: '#146EF5', display: 'flex', alignItems: 'center' }}>
                        {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-opacity-50"
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#171717' : '#1C1C1C',
                  borderTop: '1px solid #363636',
                }}
              >
                {columns.map((column) => {
                  const value = row[column.key as keyof T];
                  return (
                    <td
                      key={column.key as string}
                      style={{
                        padding: '14px 18px',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '15px',
                        color: '#E8E8E8',
                        lineHeight: '1.6',
                      }}
                    >
                      {column.render ? column.render(value, row) : String(value ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
