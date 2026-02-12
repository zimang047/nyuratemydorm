import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingForm from './RatingForm';
import './DormDetail.css';

function DormDetail({ dorm, onBack, onRatingAdded, apiUrl }) {
  const [showForm, setShowForm] = useState(false);
  const [ratings, setRatings] = useState(dorm.ratings || []);

  useEffect(() => {
    setRatings(dorm.ratings || []);
  }, [dorm.ratings]);

  const renderStars = (rating) => {
    return (
      <div className="star-rating-large">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'full' : 'empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleRatingSubmit = async (ratingData) => {
    try {
      await axios.post(
        `${apiUrl}/dorms/${dorm.id}/ratings`,
        ratingData
      );
      setShowForm(false);
      onRatingAdded();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  return (
    <div className="dorm-detail">
      <button className="back-button" onClick={onBack}>
        ← Back to Dorms
      </button>

      <div className="dorm-detail-header">
        <div>
          <h1>{dorm.name}</h1>
          <p className="dorm-location-large">📍 {dorm.location}</p>
        </div>
        <div className="dorm-rating-summary">
          <div className="avg-rating">
            <span className="rating-number">{dorm.avg_rating}</span>
            {renderStars(parseFloat(dorm.avg_rating))}
          </div>
          <p className="review-count-large">
            Based on {dorm.review_count} {dorm.review_count === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      <div className="dorm-description-section">
        <h2>About This Dorm</h2>
        <p className="dorm-description-text">{dorm.description}</p>
      </div>

      <div className="ratings-section">
        <div className="ratings-header">
          <h2>Student Reviews & Ratings</h2>
          <button
            className="add-rating-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Your Review'}
          </button>
        </div>

        {showForm && (
          <RatingForm
            onSubmit={handleRatingSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div className="ratings-list">
          {ratings.length === 0 ? (
            <p className="no-ratings">No reviews yet. Be the first to review this dorm!</p>
          ) : (
            ratings.map(rating => (
              <div key={rating.id} className="rating-item">
                <div className="rating-item-header">
                  <div>
                    <strong>{rating.student_name}</strong>
                    <div className="rating-stars-small">
                      {renderStars(rating.rating)}
                    </div>
                  </div>
                  <span className="rating-date">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="rating-comment">{rating.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DormDetail;
