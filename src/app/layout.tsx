import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tax-Harvesting",
  description: "Tax-Harvesting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)} >
      <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
        <TooltipProvider>
          <Navbar name="KoinZ" />
          <div className="flex-1">
            {children}
          </div>
        </TooltipProvider>



      </body>
    </html>
  );
}
