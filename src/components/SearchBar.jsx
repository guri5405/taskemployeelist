import React from "react";

// memo used to avoid re-render unless search props change
const SearchBar = React.memo(({ search, setSearch }) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search by name or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
});

export default SearchBar;
