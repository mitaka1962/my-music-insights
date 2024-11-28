import type { Metadata } from "next";
import { inter } from "@/lib/fonts"
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SideNav from "@/components/side-nav";
import ProgressBarProvider from "@/components/progress-bar-provider";

export const metadata: Metadata = {
  title: "MyMusic Insights",
  description: "自分の好みの音楽の傾向を把握するためのWebアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning for next-themes
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <ProgressBarProvider>
            <div className="h-screen flex">
              <div className="flex-none w-56 h-full">
                <SideNav />
              </div>
              <div className="flex-auto min-w-0 h-full overflow-y-auto">
                {children}
              </div>
            </div>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
