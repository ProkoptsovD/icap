import React from 'react';
import cn from 'classnames';
import { usePagination } from './usePagination';
import classes from './styles.module.css';

export interface PaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  prevText?: string;
  nextText?: string;
}

const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  siblingCount,
  prevText,
  nextText,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (isFirstPage) return;

    onPageChange(currentPage - 1);
  };

  const onCertainPage = (pageNumber: number) => {
    if (!currentPage) return;

    onPageChange(pageNumber);
  };

  return (
    <div className={classes.container}>
      <button
        type="button"
        className={cn(classes.paginationButton, classes.prevNextBtn)}
        onClick={onPrevious}
        disabled={isFirstPage}
      >
        {prevText ?? 'Prev'}
      </button>
      <ul className={classes.paginateButtonsList}>
        {paginationRange?.map((pageNumber, index) => {
          if (typeof pageNumber === 'string') {
            return <li key={index}>&#8230;</li>;
          }

          return (
            <li key={index}>
              <button
                type="button"
                onClick={onCertainPage.bind(this, pageNumber)}
                className={cn(classes.paginationButton, {
                  [classes.selected]: pageNumber === currentPage,
                })}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={cn(classes.paginationButton, classes.prevNextBtn)}
        onClick={onNext}
        disabled={isLastPage}
      >
        {nextText ?? 'Next'}
      </button>
    </div>
  );
};

export default Pagination;
