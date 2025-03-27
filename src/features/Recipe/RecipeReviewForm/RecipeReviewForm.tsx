'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addReview } from 'actions/review/add';
import { Button } from 'shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'shared/ui/Form';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required'),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export const RecipeReviewForm = ({ recipeId }: { recipeId: string }) => {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: '',
    },
    resolver: zodResolver(reviewSchema),
  });

  const { watch, setValue } = form;
  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    setMessage(null);

    const response = await addReview({ recipeId, ...data });

    if (!response.success) {
      setMessage(response.message || 'Failed to submit review.');
      return;
    }

    setMessage('Review submitted successfully!');
    form.reset({ rating: 0, comment: '' });
  };

  return (
    <section className="p-6 bg-gray-100 rounded-xl max-w-2xl mx-auto mt-14">
      <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
      {message && <p className="text-green-500 mb-4">{message}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(num => (
                      <Star
                        key={num}
                        className={`w-6 h-6 cursor-pointer transition ${
                          rating >= num
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-400'
                        }`}
                        onClick={() => setValue('rating', num)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full p-3 border rounded-lg resize-none focus:ring focus:ring-blue-200"
                    rows={3}
                    placeholder="Write your review..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.watch('rating') === 0 || form.formState.isSubmitting}
          >
            Submit Review
          </Button>
        </form>
      </Form>
    </section>
  );
};
