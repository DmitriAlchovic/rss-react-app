import { FC } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Error />} />
              <Route path="monster/:id" element={<Home />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default App;
