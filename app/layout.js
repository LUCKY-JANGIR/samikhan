'use client'
import "./globals.css";
import Header from "./_compnents/Header";
import { StoresProvider } from "./contexts/storeslistcontext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default  function RootLayout({ children }) {
const [user, setUser] = useState(null);
const router=useRouter();
  // Fetch user session data from the API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/session');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
    fetchUser();
  }, [router.refresh]);


  return (
        <StoresProvider>
           
    <html lang="en">
      <body>
        <Header islogin={user}/>
        {children}

      </body>
    </html>
        </StoresProvider>
  );
}
