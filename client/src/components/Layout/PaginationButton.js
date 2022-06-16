import React from "react";

const PaginationButton = ({
  PerPage,
  total,
  currentPage,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="mb-5">
      {total > PerPage && (
        <>
          <button
            className="btn btn-primary"
            id="paginate-btn"
            onClick={() => prevPage()}
            // disabled={currentPage === 1}
            hidden={currentPage === 1}
          >
            &laquo; Previous
          </button>

          <button
            className="btn btn-primary"
            id="paginate-btn"
            onClick={() => nextPage(currentPage)}
            style={{ float: "right" }}
            // disabled={currentPage === Math.ceil(total / PerPage)}
            hidden={currentPage === Math.ceil(total / PerPage)}
          >
            Next &raquo;
          </button>
        </>
      )}
    </div>
  );
};

export default PaginationButton;
