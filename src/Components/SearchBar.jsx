import React from 'react';

function SearchBar({ searchQuery, handleSearchChange }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search contacts by name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;
