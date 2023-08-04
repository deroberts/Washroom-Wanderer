import React from 'react';

function ReviewCard({ reviewData }) {
  return (
    <div className="review-card">
      <h3>{reviewData.name}</h3>
      <p>Cleanliness Rating: {reviewData.rating}/5</p>
      <p>Description: {reviewData.description}</p>
    </div>
  );
}

export default ReviewCard;
