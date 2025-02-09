import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../pages/Home/components/Search/Search';

describe('Search Component', () => {
  const mockFetchAllMonsters = jest.fn();
  const defaultProps = {
    searchQuery: 'initial search',
    loading: true,
    fetchAllMonsters: mockFetchAllMonsters,
  };

  const renderComponent = (props = defaultProps) => {
    return render(<Search {...props} />);
  };

  beforeEach(() => {
    mockFetchAllMonsters.mockClear();
  });

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays the initial search query in the input field', () => {
    renderComponent();
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('initial search');
  });

  it('updates the input field value when the input changes', () => {
    renderComponent();
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new search' } });
    expect(inputElement.value).toBe('new search');
  });

  it('calls fetchAllMonsters with the input value when the form is submitted', async () => {
    renderComponent();
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(inputElement, { target: { value: 'goblin' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetchAllMonsters).toHaveBeenCalledTimes(1);
      expect(mockFetchAllMonsters).toHaveBeenCalledWith('goblin');
    });
  });

  it('disables the input and button when loading is false', () => {
    renderComponent({ ...defaultProps, loading: false });
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(inputElement).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });

  it('enables the input and button when loading is true', () => {
    renderComponent({ ...defaultProps, loading: true });
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(inputElement).toBeEnabled();
    expect(searchButton).toBeEnabled();
  });
});
