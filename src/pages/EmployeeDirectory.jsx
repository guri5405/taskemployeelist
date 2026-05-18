import React, { useState,useMemo,useEffect,useCallback} from "react";

import employees from "../data/employees";
import useDebounce from "../hooks/useDebounce";

import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ResultCounter from "../components/ResultCounter";
import EmployeeTable from "../components/EmployeeTable";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

export default function EmployeeDirectory() {
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [salaryRange, setSalaryRange] = useState({ min: 40000, max: 130000});

  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filteredEmployees = useMemo(() => {
    let data = [...employees];
    //useMemo is used to avoid recalculating filtered employees on every render. It only recomputes when search, filters, sort options changes
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();

      data = data.filter(
        (emp) => emp.name.toLowerCase().includes(q) || emp.role.toLowerCase().includes(q));
    }

    if (selectedDepartments.length) {
      data = data.filter((emp) => selectedDepartments.includes(emp.department));
    }

    if (statusFilter.length) {
      data = data.filter((emp) => statusFilter.includes(emp.isActive ? "Active" : "Inactive"));
    }

    data = data.filter(
      (emp) =>  emp.salary >= salaryRange.min && emp.salary <= salaryRange.max);

    switch (sortOption) {
      case "name-asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "salary-low":
        data.sort((a, b) => a.salary - b.salary);
        break;

      case "salary-high":
        data.sort((a, b) => b.salary - a.salary);
        break;

      case "date-newest":
        data.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));
        break;

      case "date-oldest":
        data.sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));
        break;

      default:
        break;
    }

    return data;
  }, [debouncedSearch,selectedDepartments,statusFilter,salaryRange, sortOption]);

  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);

  //useMemo for pagination avoids slicing array again on every render only recalculates when filtered data or page changes
  
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredEmployees.slice(start, start + PAGE_SIZE);
  }, [filteredEmployees, currentPage]);


  //useEffect whenever filters/search change, reset page to 1 so user always sees first valid results
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch,selectedDepartments,statusFilter, salaryRange,sortOption]);

  //useCallback:prevents unnecessary re-creation of function and improves performance when passed to child components
  const handleDepartmentChange = useCallback((dept) => {
    setSelectedDepartments((prev) => prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]);}, []);

  // usecallback  toggles status filter (Active / Inactive) to memoized so Filters component does not re-render unnecessarily
  const handleStatusChange = useCallback((status) => {
    setStatusFilter((prev) => prev.includes(status) ? prev.filter((s) => s !== status): [...prev, status]);}, []);

    //  resetFilters: using the usecallback resets all state back to initial values
  const resetFilters = useCallback(() => {
    setSearch("");
    setSelectedDepartments([]);
    setStatusFilter([]);
    setSalaryRange({ min: 40000, max: 130000 });
    setSortOption("");
    setCurrentPage(1);
  }, []);

  const startRecord = filteredEmployees.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const endRecord = Math.min(currentPage * PAGE_SIZE,filteredEmployees.length);

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <Filters
        selectedDepartments={selectedDepartments}
        handleDepartmentChange={handleDepartmentChange}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
        sortOption={sortOption}
        setSortOption={setSortOption}
        resetFilters={resetFilters}
      />

      <ResultCounter
        startRecord={startRecord}
        endRecord={endRecord}
        total={filteredEmployees.length}
      />

      <EmployeeTable employees={paginatedEmployees} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
