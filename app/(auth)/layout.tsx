import type { Metadata } from "next";
import "./style.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Rent Locals",
  description:
    "Rent what you need, earn from what you own. RentLocals connects neighbors in the Greater Toronto Area to share cameras, tools, party gear, and more.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
