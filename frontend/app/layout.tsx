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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000
    }
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen w-full flex-col lg:max-w-screen-lg xl:max-w-screen-2xl mx-auto md:mx-0">
            <div className="hidden md:block">
              <SideMenu />
            </div>
            <div className="flex flex-col md:gap-4 md:py-4 md:pl-96 h-screen">
              <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-2 md:py-0 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
                <SideMenu />
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 md:p-6 md:pt-0">
                {children}
              </main>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
