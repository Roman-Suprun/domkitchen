import React from 'react';

import { RegistrationForm } from '../../widgets/RegistrationForm';

export const SignUpPage = () => {
  return (
    <section className="h-[calc(100vh-80px)] w-full flex">
      <div className="w-1/2 h-full login-bg" />
      <section className="w-1/2 h-full bg-white relative shadow-xl flex items-center justify-center pb-20">
        <RegistrationForm />
      </section>
    </section>
  );
};
