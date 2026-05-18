import React from "react";

// avoid re-render unless pagination state changes
const Pagination = React.memo(
  ({ currentPage, totalPages, setCurrentPage }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
           // callback is used so this runs ONLY when button is clicked and not during render
          onClick={() =>
            setCurrentPage((p) => p - 1)
            //  functional update (p => p - 1) ensures we always use latest state
          }
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)
              //  setCurrentPage runs on click only without this function can execute immediately during render
            }
            className={currentPage === p ? "active-page" : ""}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    );
  }
);

export default Pagination;
