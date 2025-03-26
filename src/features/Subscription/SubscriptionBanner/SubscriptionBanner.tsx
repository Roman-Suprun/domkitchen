'use client';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'shared/ui/Button';
import { Form, FormControl, FormField, FormItem } from 'shared/ui/Form';
import { Input } from 'shared/ui/Input';

const subscriptionFormSchema = z.object({
  email: z.string().email('Invalid email'),
});

type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>;

export const SubscriptionBanner = () => {
  const form = useForm<SubscriptionFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(subscriptionFormSchema),
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const { email } = data;

      console.log('Subscripton handler', { email });
    } catch {
      //
    }
  };
  return (
    <section className="relative bg-[#E7F9FD] rounded-3xl py-20 mt-10 overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-[620px] text-black">
          <h2 className="text-5xl font-semibold mb-10">
            Deliciousness to your inbox
          </h2>
          <p className="text-center text-base opacity-40 mb-10">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input fullWidth {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" size="xl">
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 z-10 ">
        <Image
          width={409}
          height={400}
          src="/sub_img_right.webp"
          alt="Subscription Image Left"
          className="w-full"
        />
      </div>
      <div className="absolute right-0 bottom-0 z-10 ">
        <Image
          width={470}
          height={355}
          src="/sub_img_left.webp"
          alt="Subscription Image Right"
          className="w-full"
        />
      </div>
    </section>
  );
};
