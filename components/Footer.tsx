import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = ({ classname }: { classname?: string }) => {
  return (
    <footer
      className={cn(
        `mt-[132px] mb-[54px] border-t pt-[15px] border-primary-200`,
        classname,
      )}
    >
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-10">
        <Link href="/">
          <Image
            height={32}
            width={137}
            src="/logo.svg"
            alt="RentLocals logo"
            loading="eager"
          />
        </Link>

        <div className="flex items-center gap-10 text-sm max-sm:w-full max-sm:justify-between">
          <address className="not-italic">
            <p>Designed and built by</p>
            <p>Tenzin Nyima</p>
            <Link href="mailto:ntenzin492@gmail.com">ntenzin492@gmail.com</Link>
          </address>
          <div>
            <Link
              href="https://github.com/Nyima-ui/rentLocals3"
              target="_blank"
            >
              <Image
                height={30}
                width={30}
                src="/github-dark.svg"
                alt="Check out code on Github.com"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
