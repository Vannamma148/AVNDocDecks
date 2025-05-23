import React, { useState } from "react";

export default function SearchBar({ onSearch, onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilter = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    onFilter(tag);
  };

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-lg flex items-center gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearch}
        className="border border-gray-300 p-2 flex-grow rounded"
      />

      {/* Tag Filter Dropdown */}
      <select
        value={selectedTag}
        onChange={handleFilter}
        className="border border-gray-300 p-2 rounded"
      >
        <option value="">All</option>
        <option value="Download Now">Download Now</option>
        <option value="In Progress">In Progress</option>
        <option value="Uploaded">Uploaded</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
