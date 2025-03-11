import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

const globalForPrisma = global as unknown as {
  prismaClient: ReturnType<typeof prismaClientSingleton>;
};

const prismaClient = globalForPrisma.prismaClient ?? prismaClientSingleton();

export { prismaClient };

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prismaClient = prismaClient;
