'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import { Button } from 'shared/ui/Button';

const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};

export { LogoutButton };
