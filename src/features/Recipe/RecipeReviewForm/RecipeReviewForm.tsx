'use client';

import { useState } from 'react';

import { addReview } from 'actions/review/add';
import { Star } from 'lucide-react';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

export const RecipeReviewForm = ({ recipeId }: { recipeId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = reviewSchema.safeParse({ rating, comment });

    if (!validationResult.success) {
      setErrors({
        rating: validationResult.error.flatten().fieldErrors.rating?.join(', '),
        comment: validationResult.error
          .flatten()
          .fieldErrors.comment?.join(', '),
      });

      return;
    }

    setErrors({});

    const response = await addReview({ recipeId, rating, comment });

    if (!response.success) {
      setMessage(response.message || 'Failed to submit review.');
      return;
    }

    setMessage('Review submitted successfully!');
    setRating(0);
    setComment('');
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl max-w-2xl mx-auto mt-14">
      <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
      {message && <p className="text-green-500">{message}</p>}

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
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating}</p>
        )}

        <textarea
          className="w-full p-3 border rounded-lg resize-none focus:ring focus:ring-blue-200"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment}</p>
        )}

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
