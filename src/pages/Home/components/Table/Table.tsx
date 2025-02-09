import { FC } from 'react';
import { MonstersList } from '../../../../interfaces';
import './Table.css';
import { NavLink, useParams } from 'react-router';

interface TableProps {
  monstersList: MonstersList[] | null;
}

const Table: FC<TableProps> = ({ monstersList }) => {
  const column = ['name', 'url'];
  const { page } = useParams();
  const pageSize = 5;
  const pageNumber = page ? parseInt(page) : 0;
  const monstersListWithId = monstersList
    ?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    .map((item) => {
      const urlSplit = item.url.split('/');
      const id = urlSplit[urlSplit.length - 1];
      return { ...item, id };
    });
  return (
    <>
      {monstersList?.length ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="table-row">
                {column.map((column, index) => (
                  <th className="table-header" key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monstersListWithId &&
                page &&
                monstersListWithId.map((row, index: number) => (
                  <tr key={index} className="table-row">
                    <td className="table-data">{row.name}</td>
                    <td className="table-data">
                      <NavLink to={row.id}>details</NavLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>No data</h2>
      )}
    </>
  );
};

export default Table;
