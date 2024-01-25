export function removeDuplicates<T>(
  arr: T[],
  selector: (element: T) => string,
): T[] {
  const seen = new Map<string, T>();

  for (const element of arr) {
    const key = selector(element);
    if (!seen.has(key)) {
      seen.set(key, element);
    }
  }

  return Array.from(seen.values());
}
