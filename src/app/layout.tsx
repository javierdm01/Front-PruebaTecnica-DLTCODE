import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import SessionAuthProvider from "./context/SessionAuthProvider";

const sedanSc = localFont({
  src: "./fonts/SedanSC-Regular.ttf",
  variable: "--font-sedanSc-sans",
  weight: "100 900",
});
const sedan = localFont({
  src: "./fonts/Sedan-Regular.ttf",
  variable: "--font-sedan-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sedan.variable} ${sedanSc.variable}`}>
      <SessionAuthProvider>
        {children}
      </SessionAuthProvider>
      </body>
    </html>
  );
}
