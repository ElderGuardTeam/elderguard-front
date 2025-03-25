'use client'
import "./globals.css";
import Loader from "@/components/Loader";
import { AppProvider } from "@/contexts/_index";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="elderguard">
      <body className="mi-h-screen bg-gradient-to-br from-primary font-nunito">
        <AppProvider>
          <Loader />
          {children}
        </AppProvider>
        <ToastContainer/>
      </body>
    </html>
  );
}
