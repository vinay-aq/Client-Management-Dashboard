import React from "react";

function Pagination({ page, limit, totalCount, onPageChange }) {
    const totalPages = Math.ceil(totalCount/limit);
  return (
    <div>
      <button style={{ marginTop: "20px" }} disabled={page===1} onClick={()=> onPageChange(page - 1)}>Prev </button>
      <span  style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
      <button disabled={page===totalPages}  onClick={()=> onPageChange(page + 1)}>Next </button>
    </div>
  );
}

export default Pagination;
