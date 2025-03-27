'use server';

import { prisma } from 'shared/lib/prisma';

type TSetUserAllergies = {
  userId: string;
  ingredientIds: string[];
};

export const setUserAllergies = async ({
  userId,
  ingredientIds,
}: TSetUserAllergies) => {
  const existingAllergies = await prisma.userAllergies.findMany({
    where: { userId },
    select: { ingredientId: true },
  });

  const existingIngredientIds = new Set(
    existingAllergies.map(a => a.ingredientId),
  );

  const newAllergies = ingredientIds
    .filter(id => !existingIngredientIds.has(id))
    .map(id => ({ userId, ingredientId: id }));

  const allergiesToRemove = existingAllergies
    .filter(a => !ingredientIds.includes(a.ingredientId))
    .map(a => a.ingredientId);

  if (newAllergies.length > 0) {
    await prisma.userAllergies.createMany({
      data: newAllergies,
      skipDuplicates: true,
    });
  }

  if (allergiesToRemove.length > 0) {
    await prisma.userAllergies.deleteMany({
      where: {
        userId,
        ingredientId: { in: allergiesToRemove },
      },
    });
  }
};
