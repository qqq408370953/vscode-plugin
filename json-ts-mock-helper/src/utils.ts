// Utility functions for the extension

export function formatCode(code: string, indent: number = 2): string {
  const spaces = ' '.repeat(indent);
  return code.split('\n')
    .map(line => line.trimEnd())
    .join('\n');
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
