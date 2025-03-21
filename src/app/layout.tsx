import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElderGuard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="elderguard">
      <body className="h-screen bg-gradient-to-br from-primary">
        {children}
      </body>
    </html>
  );
}
