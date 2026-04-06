import Link from "next/link";
import Image from "next/image";
import CtaButton from "./CtaButton";

const Navbar = () => {
  return (
    <header className="shadow-nav">
      <nav className="px-[80px] w-full mx-auto flex justify-between items-center py-[10px]">
        <Link href="/">
          <Image
            height={32}
            width={137}
            src="/logo.svg"
            alt="Home page"
            loading="eager"
          />
        </Link>

        <ul className="flex gap-[36px] items-center" role="list">
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">Listings</Link>
          </li>
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">Bookings</Link>
          </li>
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">Rentals</Link>
          </li>
        </ul>

        <div className="flex items-center gap-[24px]">
          <button className="rounded-full overflow-hidden size-[40px] cursor-pointer" aria-label="View profile">
            <Image
              height={41}
              width={41}
              src="/googleProfile.jpg"
              alt=""
              className="w-full h-full object-cover"
            ></Image>
          </button>

          <CtaButton text="List your item" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
