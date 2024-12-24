export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function isValidDate(date: string): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}