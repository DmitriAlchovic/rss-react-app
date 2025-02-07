import { useCallback, useEffect, useState, FC } from 'react';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { getAll } from '../../api/monsters';
import Loader from './components/Loader/Loader';
import './Home.css';
import { MonstersList } from '../../interfaces';

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storeSearchValue = localStorage.getItem('searchValue');
    return storeSearchValue ? storeSearchValue : '';
  });
  const [monstersList, setMonstersList] = useState<MonstersList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllMonsters = useCallback(async (query: string) => {
    if (!query) {
      setMonstersList(null);
      setSearchQuery('');
      localStorage.setItem('searchValue', '');
      return;
    }
    setLoading(true);
    const data = await getAll(query);
    if (data) {
      setMonstersList(data);
      setSearchQuery(query);
      localStorage.setItem('searchValue', query);
    }
    setLoading(false);
    return;
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchAllMonsters(searchQuery);
    }
  }, [fetchAllMonsters, searchQuery]);

  return (
    <>
      <div className="home-page-container">
        <Search
          loading
          searchQuery={searchQuery}
          fetchAllMonsters={fetchAllMonsters}
        />
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div>
            <Table monstersList={monstersList} />
          </div>
        )}
        <div>
          <ErrorButton />
        </div>
      </div>
    </>
  );
};

export default Home;
