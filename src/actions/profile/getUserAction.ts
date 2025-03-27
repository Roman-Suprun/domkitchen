'use server';

import { z } from 'zod';

import { prisma } from 'shared/lib/prisma';

const emailSchema = z.string().email('Invalid email');

export async function getUser(email: string | undefined) {
  try {
    const validatedEmail = emailSchema.parse(email);

    const user = await prisma.user.findUnique({
      where: { email: validatedEmail },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: 'Something went wrong while fetching the user',
    };
  }
}
