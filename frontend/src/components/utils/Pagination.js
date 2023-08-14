import React from "react";
import ReactPaginate from "react-paginate";

export const Pagination = ({ pageCount, onPress, currentPage }) => {
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };
  console.log(currentPage);
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      breakLabel="..."
      nextLabel="next"
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="previous"
      containerClassName={"pagination justify-content-center p-3"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};
