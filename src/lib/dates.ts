export type DatePrecision = 'day' | 'month';

export function formatArticleDate(date: Date, precision: DatePrecision = 'day'): string {
  return date.toLocaleDateString('en-US', precision === 'month'
    ? { year: 'numeric', month: 'long' }
    : { year: 'numeric', month: 'long', day: 'numeric' });
}

export function articleDateTime(date: Date, precision: DatePrecision = 'day'): string {
  if (precision === 'month') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }
  return date.toISOString();
}
