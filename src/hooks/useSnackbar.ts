import { useState, useCallback, useEffect } from 'react';

interface UseSnackbarReturn {
  showSnackbar: boolean;
  snackbarMessage: string;
  snackbarType: 'success' | 'error' | 'info' | 'warning';
  showMessage: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideSnackbar: () => void;
}

const useSnackbar = (): UseSnackbarReturn => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  // Auto-hide snackbar after 5 seconds
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const showMessage = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setShowSnackbar(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  return {
    showSnackbar,
    snackbarMessage,
    snackbarType,
    showMessage,
    hideSnackbar
  };
};

export default useSnackbar;
