import { FC } from 'react';
import { NavLink } from 'react-router';
import './Pagination.css';

interface PaginationProps {
  pagesCount: number;
}

const Pagination: FC<PaginationProps> = ({ pagesCount }) => {
  const setPages = () => {
    const pages = [];
    for (let index = 1; index <= pagesCount; index++) {
      pages.push(
        <NavLink key={index} to={`/${index}`}>
          {index}{' '}
        </NavLink>
      );
    }
    return pages;
  };
  return (
    <>
      <div className="pagination-container">{setPages()}</div>
    </>
  );
};

export default Pagination;
