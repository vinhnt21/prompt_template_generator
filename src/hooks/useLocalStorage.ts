import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      let item = window.localStorage.getItem(key);
      if (key === "templates" && item) {
        item = JSON.parse(item).filter((i: any) => {
          return (
            i.id !== "role-context-task-en" &&
            i.id !== "role-context-task-vi" &&
            i.id !== "context-task-en" &&
            i.id !== "context-task-vi" &&
            i.id !== "default-role-context-task-en" &&
            i.id !== "default-role-context-task-vi" &&
            i.id !== "default-context-task-en" &&
            i.id !== "default-context-task-vi"
          );
        });
        return Array.isArray(initialValue)
          ? initialValue.concat(item)
          : initialValue;
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
