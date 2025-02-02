import { Component, ReactNode } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home/Home';
import './App.css';

export default class App extends Component {
  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </>
    );
  }
}
