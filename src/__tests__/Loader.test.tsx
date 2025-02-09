import { render } from '@testing-library/react';
import Loader from '../pages/Home/components/Loader/Loader';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
  });

  it('renders the loader div with the correct class name', () => {
    const { container } = render(<Loader />);
    expect(container.getElementsByClassName('loader').length).toBe(1);
  });
});
