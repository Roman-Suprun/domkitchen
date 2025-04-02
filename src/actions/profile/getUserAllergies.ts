'use server';

import { prisma } from 'shared/lib/prisma';

export const getUserAllergies = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  try {
    const userAllergies = await prisma.userAllergies.findMany({
      where: { userId },
    });

    return userAllergies;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error(String(e));
  }
};
