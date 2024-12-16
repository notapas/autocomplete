export function debounce<T>(func: (...args: T[]) => void, ms: number) {
  let timeout: NodeJS.Timeout;

  return (...args: T[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), ms);
  };
}