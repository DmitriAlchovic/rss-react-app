import { FC } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import Home from './pages/Home/Home';

const App: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </>
  );
};

export default App;
