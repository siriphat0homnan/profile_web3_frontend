import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import 'tailwindcss/tailwind.css';

import React, {useEffect} from 'react'
import {init} from './api/web3Init'



function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {
    init();
  }, []);

  return <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
  
}

export default MyApp
