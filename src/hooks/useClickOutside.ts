import { useEffect, RefObject } from 'react';

/**
 * Custom hook for handling clicks outside of specified elements
 * @param refs - Array of refs to check against
 * @param callback - Function to call when click is outside all refs
 */
const useClickOutside = (refs: RefObject<HTMLElement>[], callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideAllRefs = refs.every(ref => 
        ref.current && !ref.current.contains(event.target as Node)
      );
      
      if (isOutsideAllRefs) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
};

export default useClickOutside; 