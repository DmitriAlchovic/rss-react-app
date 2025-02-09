import { FC } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import DetailsCard from './components/DetailsCard/DetailsCard';
import './App.css';

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Error />} />
              <Route path=":page/" element={<Home />}>
                <Route path=":monsterId" element={<DetailsCard />}></Route>
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default App;
