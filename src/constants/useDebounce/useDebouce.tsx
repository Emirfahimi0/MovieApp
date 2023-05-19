import { useEffect, useState } from "react";

export const useDebounce = (searchInput: string, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(searchInput);
  useEffect(() => {
    //set debounce vale after certain passed delay
    const handler = setTimeout(() => {
      setDebouncedValue(searchInput);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  return debouncedValue;
};
