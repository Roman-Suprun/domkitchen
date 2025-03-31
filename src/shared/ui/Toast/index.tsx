'use client';

import React from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type TToastProps = {
  containerId?: string;
};

const Toast: React.FC<TToastProps> = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      pauseOnHover={false}
      newestOnTop={false}
      icon={false}
      closeOnClick
      rtl={false}
      theme="colored"
      transition={Slide}
    />
  );
};

export default Toast;
