import "@/styles/globals.css";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen light bg-background font-sans",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-3xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <p className="text-primary">Lizandro Mayonado</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
