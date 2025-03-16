'use client';

import React, { useState } from 'react';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';

import { STATIC_ROUTES } from '../../shared/constants/staticRoutes';
import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';

type LoginUser = Pick<User, 'email' | 'password'>;

export const LoginForm = () => {
  const methods = useForm<LoginUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginUser) => {
    setLoading(true);
    setErrorMessage(null);

    const { email, password } = data;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMessage('Invalid email or password. Please try again.');
    } else {
      router.refresh();
      router.push(STATIC_ROUTES.HOME);
    }
  };

  return (
    <div className="text-center flex flex-col items-center w-full max-w-[716px]">
      <h3 className="text-4xl text-gray-700 font-semibold mb-10">Sign In</h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="w-full">
            {loading ? 'Wait...' : 'Submit'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <Link
            href={STATIC_ROUTES.REGISTRATION}
            className="text-gray-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </FormProvider>
    </div>
  );
};
