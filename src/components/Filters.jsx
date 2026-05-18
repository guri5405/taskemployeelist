import React from "react";

const departments = ["Engineering", "Sales", "HR", "Marketing"];

// Do not re-render this filter unless props change
const Filters = React.memo((props) => {
  const { 
    selectedDepartments, handleDepartmentChange,
    statusFilter,  handleStatusChange,
    salaryRange, setSalaryRange,
    sortOption, setSortOption,
    resetFilters,
} = props;

  return (
    <div className="filters-container">
      <div className="filter-card">
        <h3>Department</h3>
        {departments.map((dept) => (
          <label key={dept} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedDepartments.includes(dept)}
              onChange={() => handleDepartmentChange(dept)}
            />
            {dept}
          </label>
        ))}
      </div>

      <div className="filter-card">
        <h3>Status</h3>
        {["Active", "Inactive"].map((s) => (
          <label key={s} className="checkbox-label">
            <input
              type="checkbox"
              checked={statusFilter.includes(s)}
              onChange={() => handleStatusChange(s)}
            />
            {s}
          </label>
        ))}
      </div>

      <div className="filter-card">
        <h3>Salary</h3>
        <p>
          {salaryRange.min} - {salaryRange.max}
        </p>
        <input
          type="range"
          min="40000"
          max="130000"
          step="5000"
          value={salaryRange.max}
          onChange={(e) =>
            setSalaryRange((prev) => ({
              ...prev,
              max: Number(e.target.value),
            }))
          }
        />
      </div>

      <div className="filter-card">
        <h3>Sort</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="">Default</option>
          <option value="name-asc">Name A - Z</option>
          <option value="name-desc">Name Z - A</option>
          <option value="salary-low">Salary Low - High</option>
          <option value="salary-high">Salary High - Low</option>
          <option value="date-newest">Newest First</option>
          <option value="date-oldest">Oldest First</option>
        </select>
      </div>

      <div className="filter-card">
        <button onClick={resetFilters} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
});

export default Filters;
