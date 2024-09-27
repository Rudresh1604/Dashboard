import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Board",
  description: "School Management System",
};

const clientId =
  "735838714964-srnhcv2irrq1amqurr3jdmfljtmhq5d2.apps.googleusercontent.com" ||
  ""; // Get Google Client ID from environment variables

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
