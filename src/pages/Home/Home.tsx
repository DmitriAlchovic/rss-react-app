import { Component, ReactNode } from 'react';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { getAll } from '../../api/monsters';
import Loader from './components/Loader/Loader';
import './Home.css';

interface MonsterArrayResponse {
  index: string;
  name: string;
  url: string;
}

interface MainPageProps {
  searchQuery: string;
  data: null | MonsterArrayResponse[];
  error: string | null;
  loading: boolean;
}

export default class Home extends Component<object, MainPageProps> {
  constructor(props: object) {
    super(props);
    const searchValue = localStorage.getItem('searchValue');
    this.state = {
      searchQuery: searchValue ? searchValue : '',
      data: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    if (this.state.searchQuery) {
      this.fetchAllMonsters(this.state.searchQuery);
    }
  }

  fetchAllMonsters = async (query: string) => {
    if (query) {
      this.setState({ loading: true, error: null });
      try {
        const data = await getAll(query);
        if (data) {
          this.setState({ data, loading: false, searchQuery: query });
          localStorage.setItem('searchValue', query);
        }
      } catch (error) {
        this.setState({
          error: error instanceof Error ? error.message : 'Error',
          loading: false,
        });
      }
    } else {
      this.setState({ data: null, searchQuery: '' });
      localStorage.setItem('searchValue', '');
    }
  };

  render(): ReactNode {
    const { searchQuery, data, loading } = this.state;
    return (
      <>
        <div className="home-page-container">
          <Search
            loading
            searchQuery={searchQuery}
            fetchAllMonsters={this.fetchAllMonsters}
          />
          {loading ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : (
            <div>
              <Table monstersList={data} />
            </div>
          )}
          <div>
            <ErrorButton />
          </div>
        </div>
      </>
    );
  }
}
