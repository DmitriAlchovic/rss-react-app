import { Component, ReactNode } from 'react';
import './ErrorButton.css';

export default class ErrorButton extends Component {
  handleClick = () => {
    throw new Error('This is test error');
  };
  render(): ReactNode {
    return (
      <>
        <button className="error-button" onClick={this.handleClick}>
          Throw error
        </button>
      </>
    );
  }
}
