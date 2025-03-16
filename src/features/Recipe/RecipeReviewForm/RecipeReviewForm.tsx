'use client';

import { useState } from 'react';

import { Star } from 'lucide-react';

export const RecipeReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') return;

    setRating(0);
    setComment('');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl max-w-2xl mx-auto mt-14">
      <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(num => (
            <Star
              key={num}
              className={`w-6 h-6 cursor-pointer transition ${
                rating >= num
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-400'
              }`}
              onClick={() => setRating(num)}
            />
          ))}
        </div>

        <textarea
          className="w-full p-3 border rounded-lg resize-none focus:ring focus:ring-blue-200"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={rating === 0 || comment.trim() === ''}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};
