'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { getRecipeReviews } from 'actions/review/getListing';
import { Star } from 'lucide-react';

type Review = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export const RecipeReviewsList = ({ recipeId }: { recipeId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const response = await getRecipeReviews({ recipeId, page, limit: 5 });

      if (response.success) {
        setReviews(response?.data ?? []);
        setTotalPages(response.pagination?.totalPages ?? 1);
      }

      setLoading(false);
    }

    fetchReviews();
  }, [recipeId, page]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-14">
      <h3 className="text-xl font-semibold mb-4">User Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet. Be the first to leave a review!
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {reviews.map(review => (
              <li
                key={review.id}
                className="flex gap-4 border-b pb-4 last:border-none"
              >
                <Image
                  src={review.user.avatar}
                  alt={`${review.user.name}'s avatar`}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{review.user.name}</h4>
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
