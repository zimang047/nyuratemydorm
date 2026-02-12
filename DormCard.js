import React from 'react';
import './DormCard.css';

function DormCard({ dorm, onClick }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star empty">★</span>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="dorm-card" onClick={onClick}>
      <div className="dorm-card-header">
        <h3>{dorm.name}</h3>
        <span className="dorm-location">📍 {dorm.location}</span>
      </div>
      
      <p className="dorm-description">{dorm.description}</p>
      
      <div className="dorm-card-footer">
        {renderStars(parseFloat(dorm.avg_rating))}
        <span className="review-count">
          {dorm.review_count} {dorm.review_count === 1 ? 'review' : 'reviews'}
        </span>
      </div>
    </div>
  );
}

export default DormCard;


