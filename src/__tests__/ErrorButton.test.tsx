import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../pages/Home/components/ErrorButton/ErrorButton';
import '@testing-library/jest-dom';

describe('ErrorButton Component', () => {
  it('does not throw an error initially', () => {
    render(<ErrorButton />);
    const buttonElement = screen.getByText(/Throw error/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ErrorButton />);
    const buttonElement = screen.getByText(/Throw error/i);

    try {
      fireEvent.click(buttonElement);
    } catch (error) {
      expect((error as Error).message).toBe('Test error');
    }

    consoleError.mockRestore();
  });
});
