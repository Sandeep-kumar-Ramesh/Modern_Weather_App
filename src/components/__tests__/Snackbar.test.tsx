import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Snackbar from '../Snackbar';

describe('Snackbar', () => {
  const defaultProps = {
    message: 'Test message',
    isVisible: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when visible', () => {
    render(<Snackbar {...defaultProps} />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close notification/i })).toBeInTheDocument();
  });

  it('should not render when not visible', () => {
    render(<Snackbar {...defaultProps} isVisible={false} />);
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Snackbar {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles for success type', () => {
    render(<Snackbar {...defaultProps} type="success" />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('bg-green-500');
  });

  it('should apply correct styles for error type', () => {
    render(<Snackbar {...defaultProps} type="error" />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('bg-red-500');
  });

  it('should apply correct styles for warning type', () => {
    render(<Snackbar {...defaultProps} type="warning" />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('bg-yellow-500');
  });

  it('should apply correct styles for info type', () => {
    render(<Snackbar {...defaultProps} type="info" />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('bg-blue-500');
  });

  it('should default to info type when no type is provided', () => {
    render(<Snackbar {...defaultProps} />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('bg-blue-500');
  });

  it('should have correct positioning classes', () => {
    render(<Snackbar {...defaultProps} />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('fixed', 'bottom-4', 'sm:bottom-16', 'left-2', 'sm:left-6', 'right-2', 'sm:right-auto');
  });

  it('should have correct z-index', () => {
    render(<Snackbar {...defaultProps} />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('z-50');
  });

  it('should have correct responsive classes', () => {
    render(<Snackbar {...defaultProps} />);
    
    const snackbar = screen.getByText('Test message').closest('div');
    expect(snackbar).toHaveClass('max-w-sm', 'sm:max-w-md');
  });

  it('should display the message text correctly', () => {
    const longMessage = 'This is a very long message that should be displayed properly in the snackbar component';
    render(<Snackbar {...defaultProps} message={longMessage} />);
    
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<Snackbar {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Close notification');
  });

  it('should have proper text styling', () => {
    render(<Snackbar {...defaultProps} />);
    
    const messageElement = screen.getByText('Test message');
    expect(messageElement).toHaveClass('text-sm', 'sm:text-base');
  });

  it('should have proper button styling', () => {
    render(<Snackbar {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /close notification/i });
    expect(closeButton).toHaveClass('text-white', 'hover:text-gray-200');
  });
});

