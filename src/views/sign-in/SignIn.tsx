import React from 'react';

import { LoginForm } from '../../widgets/LoginForm';

export const SignInPage = () => {
  return (
    <section className="h-[calc(100vh-110px)] w-full flex">
      <section className="w-full h-full bg-white relative shadow-xl flex items-center justify-center pb-20">
        <LoginForm />
      </section>
    </section>
  );
};
