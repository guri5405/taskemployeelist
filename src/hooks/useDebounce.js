import { useEffect, useState } from "react";

// simple debounce hook to delay value update useful for search inputs so it does not run on every keystroke
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clear timeout if value changes before delay completes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
