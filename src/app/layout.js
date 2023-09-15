"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Loader from "@/components/loader/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
