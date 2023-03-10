import React from "react";
import classnames from "classnames";

import "./Style.css";

import { PaginitionProps } from "./Types";
import { usePagination, DOTS } from "../../hooks/usePagination";

const Pagination = ({
  onPageChange,
  totalItems,
  limit = 5,
  siblingCount = 1,
  page,
}: PaginitionProps) => {
  const paginationRange = usePagination({
    page,
    totalItems,
    siblingCount,
    limit,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (page === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul className={`${classnames("pagination-container")} justify-center mt-5`}>
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: page === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange!.map((pageNumber: number | string, index: number) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={classnames("pagination-item", {
              selected: pageNumber === page,
            })}
            onClick={() => {
              if (typeof pageNumber === "number") {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: page === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
