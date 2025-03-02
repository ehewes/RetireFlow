import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Routes from './Routes/Routes';
import AuthProvider from './Providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
    </NextUIProvider>
  </React.StrictMode>,
)