import "./Pagination.css";

function Pagination({ page, setPage }) {
  return (
    <div className="pagination">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        Prev
      </button>

      <span>Page: {page}</span>

      <button onClick={() => setPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;