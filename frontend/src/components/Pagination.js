import React from 'react';

const Pagination = ({ currentIndex, numDots }) => {
  const dots = [];

  for (let i = 0; i < numDots; i++) {
    dots.push(
      <div
        key={i}
        className={`pagination-dot ${i === currentIndex ? 'active' : ''}`}
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: i === currentIndex ? 'green' : 'gray',
          borderRadius: '50%',
          margin: '0 5px',
          cursor: 'pointer'
        }}
      />
    );
  }

  return (
    <div className="pagination-container d-flex justify-content-center mt-4">
      {dots}
    </div>
  );
};

export default Pagination;