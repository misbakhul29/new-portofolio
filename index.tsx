import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CookieConsent from 'react-cookie-consent';
import { Analytics } from "@vercel/analytics/next"

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <CookieConsent />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
