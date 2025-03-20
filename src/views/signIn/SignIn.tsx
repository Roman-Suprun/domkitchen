'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { STATIC_ROUTES } from 'shared/constants/staticRoutes';
import { Button } from 'shared/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'shared/ui/Form';
import { Input } from 'shared/ui/Input';

const signInFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export const SignInPage = () => {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { email, password } = data;

      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      router.refresh();
      router.push(STATIC_ROUTES.HOME);
    } catch {
      //
    }
  };

  return (
    <section className="max-w-[580px] w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-0.5  ">
        <h1 className="text-3xl font-bold">Sign In</h1>
      </div>

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
                <FormLabel>Email address or user name</FormLabel>
                <FormControl>
                  <Input fullWidth {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input fullWidth {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="xl">
            Sign in
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{' '}
        <Link
          href={STATIC_ROUTES.REGISTRATION}
          className="text-gray-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
};
