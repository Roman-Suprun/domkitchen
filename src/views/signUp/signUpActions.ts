'use server';

import bcrypt from 'bcryptjs';

import { prisma } from 'shared/lib/prisma';

import { RegistrationFormData, registrationFormSchema } from './signUp.types';

export async function signUp(
  data: RegistrationFormData,
): Promise<{ error: Error | null }> {
  const parsedData = registrationFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: new Error('Something went wrong') };
  }

  try {
    const { firstName, lastName, email, password } = parsedData.data || {};

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: new Error('Email already exist') };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatarUrl: '',
      },
    });

    return { error: null };
  } catch (e) {
    return { error: new Error(`Something went wrong ${e}`) };
  }
}
