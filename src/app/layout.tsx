import type { Metadata } from "next";
import { inter } from "@/lib/fonts"
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavigationBar from "@/components/navigation-bar";
import SideNav from "@/components/side-nav";
import ProgressBarProvider from "@/components/progress-bar-provider";

export const metadata: Metadata = {
  title: "MyMusic Insights",
  description: "自分の音楽傾向を把握するためのアプリ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <ProgressBarProvider>
            <div className="h-screen flex flex-col">
              <header className="flex-none">
                <NavigationBar title={`${metadata.title}`} />
              </header>
              <div className="flex-auto min-h-0 flex">
                <div className="flex-none w-44 h-full">
                  <SideNav />
                </div>
                <div className="flex-auto min-w-0 h-full">{children}</div>
              </div>
            </div>  
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
