'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { STATIC_ROUTES } from '../../shared/constants/staticRoutes';
import { registrationFormSchema } from '../../shared/model/registrationFormSchema';
import { TRegistrationFormData } from '../../shared/ts/common';
import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';
import { signUp } from './server/signUpAction';

export const RegistrationForm = () => {
  const methods = useForm<TRegistrationFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registrationFormSchema),
  });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: TRegistrationFormData) => {
    setLoading(true);
    setErrorMessage(null);

    const response = await signUp(data);

    setLoading(false);

    if (response?.error) {
      setErrorMessage(
        typeof response?.error?.message === 'string'
          ? response.error.message
          : 'Something went wrong',
      );
      return;
    }

    router.push(STATIC_ROUTES.LOGIN);
  };

  return (
    <div className="text-center flex flex-col items-center w-full max-w-[716px]">
      <h3 className="text-4xl text-gray-700 font-semibold mb-10">
        Create an account
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <Input
            name="firstName"
            label="First Name"
            type="text"
            placeholder="John"
          />
          <Input
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="your supersecret password"
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
          Already have an account?{' '}
          <Link
            href={STATIC_ROUTES.LOGIN}
            className="text-gray-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </FormProvider>
    </div>
  );
};
