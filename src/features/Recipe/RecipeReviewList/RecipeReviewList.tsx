'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Star } from 'lucide-react';

import { getRecipeReviews } from 'actions/review/getListing';
import { Pagination } from 'shared/ui/Pagination';

import { AvatarPlaceholder } from '../../../shared/ui/AvatarPlaceholder';

type Review = {
  id: string;
  user: {
    name: string;
    avatar: string | null;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export const RecipeReviewsList = ({ recipeId }: { recipeId: string }) => {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    async function fetchReviews() {
      const response = await getRecipeReviews({ recipeId, page, limit: 6 });

      if (response.success) {
        setReviews(response?.data ?? []);
        setTotalReviews(response.pagination?.total ?? 0);
      }

      setLoading(false);
    }

    fetchReviews();
  }, [page, recipeId]);

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
                {review.user.avatar ? (
                  <Image
                    src={review.user.avatar}
                    alt={`${review.user.name}'s avatar`}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <AvatarPlaceholder
                    size="s"
                    firstName={review.user.name.split(' ')[0]}
                    lastName={review.user.name.split(' ')[1]}
                  />
                )}

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

          <Pagination total={totalReviews} />
        </>
      )}
    </div>
  );
};
