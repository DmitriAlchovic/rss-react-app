import { render, screen } from '@testing-library/react';
import Error from '../pages/Error/Error';
import '@testing-library/jest-dom';

describe('Error Component', () => {
  it('renders the "404 NOT FOUND" message', () => {
    render(<Error />);
    const headingElement = screen.getByText(/404 NOT FOUND/i);
    expect(headingElement).toBeInTheDocument();
  });
});
