'use client'

import localFont from "next/font/local";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideMenu } from "@/components/SideMenu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex min-h-screen w-full flex-col lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
            <div className="hidden sm:block">
              <SideMenu />
            </div>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-96 h-screen">
              <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-2 md:py-0 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SideMenu />
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 sm:p-6 sm:pt-0">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
