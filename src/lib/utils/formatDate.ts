export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long'
  }).format(date);
}
