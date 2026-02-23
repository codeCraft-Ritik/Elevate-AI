import { useEffect } from 'react';

export const useSecurity = () => {
  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e) => e.preventDefault();

    // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc.)
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') // Prevent saving the page
      ) {
        e.preventDefault();
        return false;
      }
    };

    // The debuggerTrap interval has been removed to stop the site 
    // from automatically pausing when DevTools are detected.

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};