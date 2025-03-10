'use server';

import bcrypt from 'bcryptjs';

import { prismaClient } from '../../../shared/lib/db';
import { registrationFormSchema } from '../../../shared/model/registrationFormSchema';
import { TRegistrationFormData } from '../../../shared/ts/common';

export async function signUp(
  data: TRegistrationFormData,
): Promise<{ error: Error | null }> {
  const parsedData = registrationFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: new Error('Something went wrong') };
  }

  try {
    const { firstName, lastName, email, password } = parsedData.data || {};
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: new Error('Email already exist') };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prismaClient.user.create({
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
