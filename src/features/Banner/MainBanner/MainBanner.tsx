'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from 'shared/ui/Button';

import { STATIC_ROUTES } from '../../../shared/constants/staticRoutes';

export const MainBanner = () => {
  return (
    <section className="relative bg-[#E7F9FD] rounded-3xl py-20 px-10 mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-black">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Cook your <span className="text-primary">favorite</span> meals with
            DomKitchen
          </h1>
          <p className="text-base opacity-60 mb-10">
            Discover step-by-step recipes, tips, and tricks to make your kitchen
            experience more delicious and enjoyable.
          </p>
          <Link href={STATIC_ROUTES.RECIPES}>
            <Button>Get Started</Button>
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/main_banner.webp"
            alt="Main banner illustration"
            width={500}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
