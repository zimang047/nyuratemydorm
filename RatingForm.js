import React, { useState } from 'react';
import './RatingForm.css';

function RatingForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({
      rating,
      comment: comment.trim(),
      student_name: studentName.trim() || 'Anonymous'
    });
    // Reset form
    setRating(0);
    setComment('');
    setStudentName('');
  };

  const renderStars = () => {
    return (
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-button ${
              star <= (hoveredRating || rating) ? 'active' : ''
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            ★
          </button>
        ))}
        <span className="rating-label">
          {rating > 0 ? `${rating} out of 5` : 'Select rating'}
        </span>
      </div>
    );
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <h3>Add Your Review</h3>
      
      <div className="form-group">
        <label htmlFor="studentName">Your Name (optional)</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your name or stay anonymous"
        />
      </div>

      <div className="form-group">
        <label>Rating *</label>
        {renderStars()}
      </div>

      <div className="form-group">
        <label htmlFor="comment">Your Review (optional)</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience living in this dorm..."
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </div>
    </form>
  );
}

export default RatingForm;
