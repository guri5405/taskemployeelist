import React from "react";

/*  React.memo: Table only re-renders if employee data changes */

const EmployeeTable = React.memo(({ employees }) => {
  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Joined</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.length ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>₹{emp.salary.toLocaleString()}</td>
                <td>{emp.joinedAt}</td>
                <td>
                  <span
                    className={
                      emp.isActive
                        ? "active-status"
                        : "inactive-status"
                    }
                  >
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default EmployeeTable;
