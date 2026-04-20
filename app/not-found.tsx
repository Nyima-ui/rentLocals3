import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CtaButton from "@/components/CtaButton";
import Link from "next/link";

const NotFound = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="min-h-[94vh] relative flex justify-center items-center">
        <p className="font-syne text-[318px] font-semibold text-text/8 select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
          404
        </p>
        <div className="flex flex-col items-center relative z-10">
          <h1 className="font-syne font-medium text-[36px] leading-tight">
            Page not Found.
          </h1>
          <p className="mt-2">The page you are looking for cannot be found.</p>
          <Link href="/">
            <CtaButton text="Back To Home" className="mt-6" />
          </Link>
        </div>
      </div>
    </AuthProvider>
  );
};

export default NotFound;
