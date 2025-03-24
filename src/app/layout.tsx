'use client'
import "./globals.css";
import Loader from "@/components/Loader";
import { AppProvider } from "@/contexts/_index";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="elderguard">
      <body className="h-screen bg-gradient-to-br from-primary">
        <AppProvider>
          <Loader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
