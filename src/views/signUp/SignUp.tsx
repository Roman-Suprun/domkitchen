'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signUp } from 'actions/auth/signUpAction';
import { STATIC_ROUTES } from 'shared/constants/staticRoutes';
import { Button, GoogleAuthButton } from 'shared/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'shared/ui/Form';
import { Input } from 'shared/ui/Input';

import {
  RegistrationFormData,
  registrationFormSchema,
} from '../../actions/auth/signUp.types';
import { AuthDivider } from '../../shared/ui/AuthDivider';

export const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registrationFormSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setLoading(true);
    try {
      await signUp(data);

      toast.success('Account created! Please log in.');
      router.push(STATIC_ROUTES.LOGIN);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-[580px] w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-0.5">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href={STATIC_ROUTES.LOGIN}
            className="text-gray-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input fullWidth {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input fullWidth {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What’s your email?</FormLabel>
                <FormControl>
                  <Input fullWidth {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create a password</FormLabel>
                <FormControl>
                  <Input type="password" fullWidth {...field} />
                </FormControl>
                <FormDescription>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="xl" disabled={loading}>
            {loading ? 'Creating...' : 'Create an account'}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center gap-y-4 w-full">
        <AuthDivider />
        <GoogleAuthButton />
      </div>
    </section>
  );
};
