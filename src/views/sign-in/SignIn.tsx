import React from 'react';

import { LoginForm } from '../../widgets/LoginForm';

export const SignInPage = () => {
  return (
    <section className="h-[calc(100vh-80px)] w-full flex">
      <section className="w-1/2 h-full bg-white relative shadow-xl flex items-center justify-center pb-20">
        <LoginForm />
      </section>
      <div className="w-1/2 h-full login-bg" />
    </section>
  );
};
