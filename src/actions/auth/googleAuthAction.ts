'use server';

import { GoogleProfile } from 'next-auth/providers/google';

import { prisma } from 'shared/lib/prisma';

export async function googleAuth(profile: GoogleProfile) {
  if (!profile?.email) {
    throw new Error('No profile!');
  }

  try {
    // @ts-ignore
    await prisma.user.upsert({
      where: {
        email: profile.email,
      },
      // @ts-ignore
      create: {
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        googleId: profile.sub,
        profileImage: profile.picture,
      },
      update: {
        // Might be usefull in case of aligning with data from google profile.
        // For now we have single user by email despite the fact that we can register manual or via google.
        // firstName: profile.given_name,
        // lastName: profile.family_name,
        // profileImage: profile.picture,
      },
    });

    return true;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error(String(e));
  }
}
