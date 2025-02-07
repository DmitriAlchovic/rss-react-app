import { FC, useState } from 'react';
import './ErrorButton.css';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('Test error');
  }
  return (
    <>
      {hasError}
      <button
        className="error-button"
        onClick={() => {
          setHasError(true);
        }}
      >
        Throw error
      </button>
    </>
  );
};

export default ErrorButton;
