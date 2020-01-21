import { useCallback, useEffect, useState } from 'react';

export const useSmartOutline = () => {
  const [isTabbing, setIsTabbing] = useState(false);

  const handleFirstTab = useCallback(
    (e: any) => {
      if (e.keyCode === 9) {
        // the "I am a keyboard user" key
        setIsTabbing(true);
        window.removeEventListener('keydown', handleFirstTab);
      }
    },
    [setIsTabbing]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, [handleFirstTab]);

  return isTabbing;
};
