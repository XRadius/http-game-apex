export function serialize<T>(item: T) {
  return `(${Object.entries(item)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join(',')})`;
}

export function shallowEquals<T>(item: T, otherItem: T) {
  return Object.entries(item)
    .map(([k, v]) => [v, otherItem[k as keyof T]])
    .every(([a, b]) => a === b);
}
