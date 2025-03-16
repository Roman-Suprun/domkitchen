import React from 'react';

import { RegistrationForm } from '../../widgets/RegistrationForm';

export const SignUpPage = () => {
  return (
    <section className="h-[calc(100vh-110px)] w-full flex">
      <section className="w-full h-full bg-white relative shadow-xl flex items-center justify-center pb-20">
        <RegistrationForm />
      </section>
    </section>
  );
};
