import { useEffect } from 'react';

export function useDebounce(callback, delay, dependencies) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(dependencies || []), delay]);
}