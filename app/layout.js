'use client'
import localFont from "@/models/node_modules/next/font/local";
import "./globals.css";
import Header from "./_compnents/Header";
import { SessionProvider } from '../../models/node_modules/next-auth/src/react';
import { getServerSession } from '../../models/node_modules/next-auth/src/next';
import { authOptions } from './api/auth/[...nextauth]/route'
import { StoresProvider } from "./contexts/storeslistcontext";


export default  function RootLayout({ children }) {
  return (
      <SessionProvider>
        <StoresProvider>
           
    <html lang="en">
      <body>
        <Header/>
        {children}

      </body>
    </html>
        </StoresProvider>
    </SessionProvider>
  );
}
