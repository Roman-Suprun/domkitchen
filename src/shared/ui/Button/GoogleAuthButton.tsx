import NextImage from 'next/image';

import { signIn } from 'next-auth/react';

import buttonGoogleLogo from '../../../../public/buttonGoogleLogo.svg';
import { STATIC_ROUTES } from '../../constants/staticRoutes';

export const GoogleAuthButton = () => {
  return (
    <button
      className=""
      type="button"
      onClick={() => signIn('google', { callbackUrl: STATIC_ROUTES.HOME })}
    >
      <NextImage src={buttonGoogleLogo} alt="" />
    </button>
  );
};
