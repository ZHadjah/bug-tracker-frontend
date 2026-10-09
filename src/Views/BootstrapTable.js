import React, { useState } from "react";

function getValue(record, dataIndex) {
  return Array.isArray(dataIndex)
    ? dataIndex.reduce((value, key) => value?.[key], record)
    : record?.[dataIndex];
}

function BootstrapTable({
  columns,
  dataSource = [],
  loading = false,
  pageSize = 10,
  caption,
  tableLabel,
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(dataSource.length / pageSize));
  const visibleRows = dataSource.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      {loading ? (
        <div className="p-4 text-center" role="status">
          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
          Loading…
        </div>
      ) : (
        <div
          className="table-responsive"
          tabIndex={0}
          role="group"
          aria-label={tableLabel ? `${tableLabel} table` : undefined}
        >
          <table
            className="table table-striped table-hover align-middle mb-0"
            tabIndex={0}
            aria-label={tableLabel}
          >
            <caption className="visually-hidden">
              {caption || (tableLabel ? `${tableLabel} table.` : "Data table.")}
            </caption>
            <thead className="table-light">
              <tr>
                {columns.map((column, index) => (
                  <th key={column.key || column.title || index} scope="col">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td className="text-center text-body-secondary py-4" colSpan={columns.length}>
                    No records found.
                  </td>
                </tr>
              ) : (
                visibleRows.map((record, rowIndex) => {
                  const rowDescription = columns
                    .filter((column) => column.dataIndex)
                    .map((column) => {
                      const value = getValue(record, column.dataIndex);
                      return value == null || value === ""
                        ? null
                        : `${column.title}: ${value}`;
                    })
                    .filter(Boolean)
                    .join(", ");

                  return (
                  <tr
                    key={record.id ?? record.$id ?? rowIndex}
                    tabIndex={0}
                    aria-label={`${tableLabel ? `${tableLabel}, ` : ""}row ${rowIndex + 1}${rowDescription ? `, ${rowDescription}` : ""}`}
                  >
                    {columns.map((column, columnIndex) => (
                      <td key={column.key || column.title || columnIndex}>
                        {column.render
                          ? column.render(getValue(record, column.dataIndex), record)
                          : getValue(record, column.dataIndex)}
                      </td>
                    ))}
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
      {!loading && pageCount > 1 && (
        <nav className="p-3" aria-label="Table pagination">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <li className={`page-item ${page === pageNumber ? "active" : ""}`} key={pageNumber}>
                <button
                  type="button"
                  className="page-link"
                  aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link"
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default BootstrapTable;
