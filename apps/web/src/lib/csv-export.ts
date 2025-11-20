/**
 * CSV Export Utilities
 * Converts JSON data to CSV format for download
 */

/**
 * Convert array of objects to CSV string
 */
export function jsonToCSV(data: Record<string, unknown>[], headers?: string[]): string {
  if (data.length === 0) return '';

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);

  // Create header row
  const headerRow = csvHeaders.join(',');

  // Create data rows
  const dataRows = data.map(row => {
    return csvHeaders
      .map(header => {
        const value = row[header];

        // Handle different types
        if (value === null || value === undefined) {
          return '';
        }

        // Convert arrays/objects to JSON strings
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }

        // Escape strings with commas or quotes
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }

        return stringValue;
      })
      .join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Download data as CSV file
 */
export function downloadCSV(data: Record<string, unknown>[], filename: string): void {
  const csv = jsonToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Flatten nested objects for CSV export
 */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string | number | boolean> {
  const flattened: Record<string, string | number | boolean> = {};

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[newKey] = '';
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value as Record<string, unknown>, newKey));
    } else if (Array.isArray(value)) {
      flattened[newKey] = JSON.stringify(value);
    } else {
      flattened[newKey] = value as string | number | boolean;
    }
  });

  return flattened;
}

/**
 * Convert nested JSON to flat CSV
 */
export function nestedJsonToCSV(data: Record<string, unknown>[]): string {
  const flattened = data.map(item => flattenObject(item));
  return jsonToCSV(flattened);
}
