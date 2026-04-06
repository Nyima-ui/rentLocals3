"use client";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "./CtaButton";
import { useState } from "react";

const Navbar = () => {
  const [isDropDownOpened, setisDropDownOpened] = useState(false);
  return (
    <header className="shadow-nav">
      {/* DESKTOP  */}
      <nav className="px-[80px] max-lg:px-[40px] max-sm:px-[20px] w-full mx-auto flex justify-between items-center py-[10px] max-md:hidden">
        <Link href="/">
          <Image
            height={32}
            width={137}
            src="/logo.svg"
            alt="Home page"
            loading="eager"
          />
        </Link>

        <ul
          className="flex gap-[36px] max-lg:gap-[16px] items-center"
          role="list"
        >
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">
              Listings
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">
              Bookings
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/listing"} className="px-3 py-1">
              Rentals
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-[24px]">
          <div className="rounded-full size-[40px] relative">
            <button
              className="rounded-full overflow-hidden size-[40px] cursor-pointer"
              aria-label="View profile"
              onClick={() => setisDropDownOpened((prev) => !prev)}
            >
              <Image
                height={41}
                width={41}
                src="/googleProfile.jpg"
                alt=""
                className="w-full h-full object-cover"
              ></Image>
            </button>
            {isDropDownOpened && (
              <ul className="absolute top-full right-0 w-[115px] bg-primary-100 py-[8px] rounded-md shadow-card translate-y-2">
                <li className="px-[8px] hover:bg-primary-200">
                  <Link href="/">Profile</Link>
                </li>
                <li className="px-[8px] hover:bg-primary-200 cursor-pointer mt-1">
                  <button>Log out</button>
                </li>
              </ul>
            )}
          </div>

          <CtaButton text="List your item" />
        </div>
      </nav>

      {/* MOBILE  */}
      <nav className="border max-lg:px-[40px] max-sm:px-[20px] hidden max-md:block">
        <Link href="/">
          <Image
            height={32}
            width={137}
            src="/logo.svg"
            alt="Home page"
            loading="eager"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
