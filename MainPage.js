import React from 'react';
import './MainPage.css';

function MainPage({ dorms, onDormSelect }) {
  return (
    <div className="main-page">
      <header className="main-header">
        <div className="header-content">
          <h1>🏠 NYU Dorm Ratings</h1>
        </div>
        <p className="header-subtitle">Select a residence hall to view details and reviews</p>
      </header>

      <main className="dorms-grid">
        {dorms.length === 0 ? (
          <div className="no-dorms">
            <p>No dorms available</p>
          </div>
        ) : (
          dorms.map(dorm => (
            <button
              key={dorm.id}
              className="dorm-button"
              onClick={() => onDormSelect(dorm.id)}
            >
              <div className="dorm-button-content">
                <h2>{dorm.name}</h2>
                <p className="dorm-location">📍 {dorm.location}</p>
                <div className="dorm-stats">
                  <div className="rating-display">
                    <span className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(parseFloat(dorm.avg_rating)) ? 'star filled' : 'star empty'}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="rating-value">{dorm.avg_rating}</span>
                  </div>
                  <span className="review-count">
                    {dorm.review_count} {dorm.review_count === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </main>
    </div>
  );
}

export default MainPage;
