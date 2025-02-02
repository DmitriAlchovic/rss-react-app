import { Component, ReactNode } from 'react';
import { MonstersList } from '../../../../interfaces';
import './Table.css';

interface TableProps {
  monstersList: MonstersList[] | null;
}

const column = ['name', 'url'];

export default class Table extends Component<TableProps> {
  render(): ReactNode {
    const { monstersList } = this.props;
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
                {monstersList.map((row: MonstersList, index: number) => (
                  <tr key={index} className="table-row">
                    <td className="table-data">{row.name}</td>
                    <td className="table-data">{row.url}</td>
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
  }
}
