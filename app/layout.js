'use client'
import "./globals.css";
import Header from "./_compnents/Header";
import { StoresProvider } from "./contexts/storeslistcontext";


export default  function RootLayout({ children }) {
  return (
        <StoresProvider>
           
    <html lang="en">
      <body>
        <Header/>
        {children}

      </body>
    </html>
        </StoresProvider>
  );
}
