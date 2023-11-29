import React, { useState } from "react";

import "./Table.css";
const Table = ({ data, headers }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page data
  const currentData = data.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              {headers.map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.mail}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
