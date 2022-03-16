import React from "react";

const Pagination = ({ contracts, handleChange, page }) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {contracts.map((cont, index) => {
            return (
              <li
                key={index}
                className={`page-item ${page === index ? "active" : null}`}
              >
                <button
                  className="page-link"
                  onClick={() => handleChange(index)}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
