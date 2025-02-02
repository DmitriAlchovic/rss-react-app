import { Component, ReactNode } from 'react';
import './Loader.css';

export default class Loader extends Component {
  handleClick = () => {
    throw new Error('this is test error');
  };
  render(): ReactNode {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }
}
