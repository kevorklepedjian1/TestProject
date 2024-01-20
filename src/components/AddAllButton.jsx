import React from 'react';

const AddAllButton = ({ onAddAll }) => {
  const handleAddAllClick = () => {
    onAddAll();
  };

  return (
    <div className="inline-flex" role="group" style={{ marginLeft: "20px" }}>
      <button onClick={handleAddAllClick} style={{ cursor: 'pointer' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>{" "}
        Add All
      </button>
      <button style={{ cursor: 'not-allowed' }} disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
    </div>
  );
};

export default AddAllButton;
