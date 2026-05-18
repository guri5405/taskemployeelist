import React from "react";

// memo used only re-renders when count values change
const ResultCounter = React.memo(
  ({ startRecord, endRecord, total }) => {
    return (
      <div className="result-counter">
        Showing {startRecord}–{endRecord} of {total} employees
      </div>
    );
  }
);

export default ResultCounter;
