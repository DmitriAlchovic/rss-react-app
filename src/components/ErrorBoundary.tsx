import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.message, info.componentStack);
  }

  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
