import React from 'react';
import '../styles/globals.css'; 

import { Nunito_Sans } from "next/font/google"

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <main className={`${nunito.className}`}>
            <Component {...pageProps} />
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;

