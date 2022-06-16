import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({
  PerPage,
  total,
  paginate,
  currentPage,
  nextPage,
  prevPage,
  perPageLength,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      {total > PerPage && (
        <Pagination size="md" className="pagination-container">
          <Pagination.Item
            onClick={() => prevPage()}
            disabled={currentPage === 1}
            id="paginate-btn"
          >
            &laquo; Prev
          </Pagination.Item>
          {pageNumbers.map((number, i) => {
            return (
              <Pagination.Item
                id="paginate-btn"
                key={i}
                onClick={() => paginate(number)}
                active={currentPage === number}
              >
                {number}
              </Pagination.Item>
            );
          })}
          <Pagination.Item
            onClick={() => nextPage()}
            disabled={currentPage === Math.ceil(total / PerPage)}
            id="paginate-btn"
          >
            Next &raquo;
          </Pagination.Item>
        </Pagination>
      )}
      <h4 style={{ fontWeight: "500", paddingLeft: "10px" }}>
        {perPageLength} of {total} results.
      </h4>
    </div>
  );
};

export default PaginationBar;
