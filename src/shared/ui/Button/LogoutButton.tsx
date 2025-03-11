'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import { Button } from './Button';

export const LogoutButton = () => {
  return (
    <Button className="bg-green-50" onClick={() => signOut()}>
      Logout
    </Button>
  );
};
