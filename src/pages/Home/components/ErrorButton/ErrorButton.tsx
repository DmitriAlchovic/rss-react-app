import { Component, ReactNode } from 'react';
import './ErrorButton.css';

interface ErrorButtonState {
  hasError: boolean;
}

export default class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  handleClick = () => {
    this.setState({ hasError: true });
  };
  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('This is  a test error');
    }
    return (
      <>
        <button className="error-button" onClick={this.handleClick}>
          Throw error
        </button>
      </>
    );
  }
}
