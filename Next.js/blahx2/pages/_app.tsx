/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider cssVarsRoot={undefined}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
