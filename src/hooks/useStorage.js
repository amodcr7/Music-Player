import { useState, useEffect } from 'react';

const useStorage = (key, defaultValue, storageType = 'session') => {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  
  const [value, setValue] = useState(() => {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  return [value, setValue];
};

export default useStorage;