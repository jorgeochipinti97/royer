import '../styles/globals.css';
import "aos/dist/aos.css";

import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import { useEffect } from 'react';
import AOS from "aos";




function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay:100
    });

  })

  return (
    <SessionProvider>

      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
