'use client'
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_compnents/Header";
import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
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
