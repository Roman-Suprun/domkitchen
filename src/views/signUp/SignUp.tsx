'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { STATIC_ROUTES } from 'shared/constants/staticRoutes';
import { Button } from 'shared/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from 'shared/ui/Form';
import { Input } from 'shared/ui/Input';

import { RegistrationFormData, registrationFormSchema } from './signUp.types';
import { signUp } from './signUpActions';

export const SignUpPage = () => {
  const router = useRouter();

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
    try {
      await signUp(data);

      router.push(STATIC_ROUTES.LOGIN);
    } catch {
      //
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
                  <Input fullWidth {...field} />
                </FormControl>
                <FormDescription>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" size="xl">
            Create an account
          </Button>
        </form>
      </Form>
    </section>
  );
};
