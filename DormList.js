import React from 'react';
import DormCard from './DormCard';
import './DormList.css';

function DormList({ dorms, onDormSelect }) {
  if (dorms.length === 0) {
    return (
      <div className="dorm-list-empty">
        <p>No dorms found. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="dorm-list">
      <div className="dorm-list-header">
        <h2>NYU Residence Halls</h2>
        <p>Click on a dorm to see reviews and add your own rating</p>
      </div>
      <div className="dorm-grid">
        {dorms.map(dorm => (
          <DormCard
            key={dorm.id}
            dorm={dorm}
            onClick={() => onDormSelect(dorm.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DormList;


