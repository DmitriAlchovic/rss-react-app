import { useCallback, useEffect, useState, FC } from 'react';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { getAll } from '../../api/monsters';
import Loader from './components/Loader/Loader';
import './Home.css';
import { MonstersList } from '../../interfaces';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Pagination from '../../components/Pagination/Pagination';
import useLocalStorage from '../../hooks/useLocalStorage';

const Home: FC = () => {
  const storage = useLocalStorage('searchValue');
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storageItem = storage.getItem();
    return storageItem ? storageItem : '';
  });
  const [monstersList, setMonstersList] = useState<MonstersList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchAllMonsters = useCallback(async (query: string) => {
    if (!query) {
      setMonstersList(null);
      setSearchQuery('');
      storage.setItem('');
      return;
    }
    setLoading(true);
    const data = await getAll(query);
    if (data) {
      setMonstersList(data);
      setSearchQuery(query);
      storage.setItem(query);
      navigate(`/${1}`);
      console.log(location.pathname);
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
            <div className="cards-container">
              <Table monstersList={monstersList} />
              <Outlet />
            </div>
            {monstersList && (
              <Pagination
                pagesCount={Math.ceil(monstersList.length / pageSize)}
              />
            )}
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
