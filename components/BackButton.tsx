import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BackButton = ({ classname }: { classname?: string }) => {
  return (
    <Link href="/" className={cn(`flex items-center hover:opacity-75 py-1.5 w-fit`, classname)}>
      <ChevronLeft size={21} color="#2c1815" strokeWidth={1.5}/>
      <span className="text-sm font-medium block">Back to home</span>
    </Link>
  );
};

export default BackButton;
