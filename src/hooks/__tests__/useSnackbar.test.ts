import { renderHook, act } from '@testing-library/react';
import useSnackbar from '../useSnackbar';

describe('useSnackbar', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.showSnackbar).toBe(false);
    expect(result.current.snackbarMessage).toBe('');
    expect(result.current.snackbarType).toBe('info');
  });

  it('should show message with default type', () => {
    const { result } = renderHook(() => useSnackbar());

    act(() => {
      result.current.showMessage('Test message');
    });

    expect(result.current.showSnackbar).toBe(true);
    expect(result.current.snackbarMessage).toBe('Test message');
    expect(result.current.snackbarType).toBe('info');
  });

  it('should show message with specified type', () => {
    const { result } = renderHook(() => useSnackbar());

    act(() => {
      result.current.showMessage('Error message', 'error');
    });

    expect(result.current.showSnackbar).toBe(true);
    expect(result.current.snackbarMessage).toBe('Error message');
    expect(result.current.snackbarType).toBe('error');
  });

  it('should support all message types', () => {
    const { result } = renderHook(() => useSnackbar());

    const types = ['success', 'error', 'info', 'warning'] as const;

    types.forEach(type => {
      act(() => {
        result.current.showMessage(`${type} message`, type);
      });

      expect(result.current.showSnackbar).toBe(true);
      expect(result.current.snackbarMessage).toBe(`${type} message`);
      expect(result.current.snackbarType).toBe(type);

      act(() => {
        result.current.hideSnackbar();
      });
    });
  });

  it('should hide snackbar manually', () => {
    const { result } = renderHook(() => useSnackbar());

    act(() => {
      result.current.showMessage('Test message');
    });

    expect(result.current.showSnackbar).toBe(true);

    act(() => {
      result.current.hideSnackbar();
    });

    expect(result.current.showSnackbar).toBe(false);
  });

  it('should have proper function types', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(typeof result.current.showMessage).toBe('function');
    expect(typeof result.current.hideSnackbar).toBe('function');
  });

  it('should handle multiple show/hide cycles', () => {
    const { result } = renderHook(() => useSnackbar());

    // First cycle
    act(() => {
      result.current.showMessage('First message');
    });
    expect(result.current.showSnackbar).toBe(true);

    act(() => {
      result.current.hideSnackbar();
    });
    expect(result.current.showSnackbar).toBe(false);

    // Second cycle
    act(() => {
      result.current.showMessage('Second message', 'warning');
    });
    expect(result.current.showSnackbar).toBe(true);
    expect(result.current.snackbarMessage).toBe('Second message');
    expect(result.current.snackbarType).toBe('warning');
  });
});
