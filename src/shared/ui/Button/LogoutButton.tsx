'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import { Button } from './Button';

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
