import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rent Locals",
  description:
    "Rent what you need, earn from what you own. RentLocals connects neighbors in the Greater Toronto Area to share cameras, tools, party gear, and more.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
