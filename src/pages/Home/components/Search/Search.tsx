import { Component, ReactNode } from 'react';
import './Search.css';

interface SearchProps {
  searchQuery: string;
  loading: boolean;
  fetchAllMonsters(searchQuery: string): void;
}

interface SearchState {
  searchString: string;
}
export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchString: this.props.searchQuery,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ searchString: value });
  };
  handelSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchString } = this.state;
    this.props.fetchAllMonsters(searchString);
  };

  render(): ReactNode {
    const { searchString } = this.state;
    const { loading } = this.props;
    return (
      <>
        <form className="search-form" onSubmit={this.handelSubmit}>
          <input
            className="search-input"
            disabled={!loading}
            type="text"
            name="search"
            value={searchString}
            onChange={this.handleInputChange}
            placeholder="Enter dnd 5e monster name"
          />
          <button className="search-button" disabled={!loading} type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}
