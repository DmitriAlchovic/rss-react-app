import { FC, useState, SyntheticEvent, ChangeEvent } from 'react';
import './Search.css';

interface SearchProps {
  searchQuery: string;
  loading: boolean;
  fetchAllMonsters(searchQuery: string): void;
}

const Search: FC<SearchProps> = ({
  loading,
  searchQuery,
  fetchAllMonsters,
}) => {
  const [searchString, setSearchString] = useState(searchQuery);
  const handelSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAllMonsters(searchString);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <form className="search-form" onSubmit={handelSubmit}>
        <input
          className="search-input"
          disabled={!loading}
          type="text"
          name="search"
          value={searchString}
          onChange={handleChange}
          placeholder="Enter dnd 5e monster name"
        />
        <button className="search-button" disabled={!loading} type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
