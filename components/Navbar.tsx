"use client";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "./CtaButton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthProvider";

const Navbar = () => {
  const [isDropDownOpened, setisDropDownOpened] = useState(false);
  const [isMobileMenuOpened, setisMobileMenuOpened] = useState(false);
  const { user, profile } = useAuth();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setisDropDownOpened(false);
  };

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpened]);
  return (
    <>
      <header className="shadow-nav relative">
        {/* DESKTOP  */}
        <nav
          className="px-[80px] max-lg:px-[40px] max-sm:px-[20px] w-full mx-auto flex justify-between items-center py-[10px] max-md:hidden"
          aria-label="Desktop navigation"
        >
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
            <div className="relative">
              {profile?.avatar ? (
                <button
                  className="rounded-full overflow-hidden size-[40px] cursor-pointer"
                  aria-label="View profile"
                  onClick={() => setisDropDownOpened((prev) => !prev)}
                  aria-expanded={isDropDownOpened}
                  aria-haspopup="true"
                >
                  <Image
                    height={41}
                    width={41}
                    src={profile?.avatar}
                    alt={profile?.fullname ?? ""}
                    className="w-full h-full object-cover"
                  ></Image>
                </button>
              ) : (
                <Link href="/signup" className="whitespace-nowrap">
                  Sign up
                </Link>
              )}

              {isDropDownOpened && (
                <ul className="absolute top-full right-0 w-[115px] bg-primary-100 py-[8px] rounded-md shadow-sm shadow-primary-400/70  translate-y-2">
                  <li className="px-[8px] hover:bg-primary-200">
                    <Link href="/">Profile</Link>
                  </li>
                  <li className="px-[8px] cursor-pointer mt-1">
                    <button
                      onClick={handleSignOut}
                      className="cursor-pointer border px-1 py-0.5 border-primary-200 hover:bg-primary-200 rounded-md"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <Link href="/listing/new">
              <CtaButton text="List your item" />
            </Link>
          </div>
        </nav>
      </header>
      {/* MOBILE  */}
      <nav className="max-lg:px-[40px] max-sm:px-[20px] hidden max-md:flex py-[12px] rounded-md border border-primary-200/40 items-center justify-between fixed top-0 left-0 w-full bg-bg-main z-30">
        <Link href="/">
          <Image
            height={32}
            width={137}
            src="/logo.svg"
            alt="Home page"
            loading="eager"
          />
        </Link>

        <div
          className="h-[16px] relative  border-red-600"
          onClick={() => setisMobileMenuOpened((prev) => !prev)}
        >
          <button
            className={cn(`block w-[25px] h-[16px] cursor-pointer
           after:content-[''] after:absolute after:top-full after:h-0 after:border-b-3 after:border-text after:w-full after:left-0 after:right-0 after:transition-all after:ease-out after:duration-300 after:rounded-md ${isMobileMenuOpened && `after:-rotate-45 afer:origin-center after:top-1/2`}
           
           before:content-[''] before:absolute before:top-0 before:h-0 before:border-b-3 before:border-text before:w-full beforer:left-0 before:right-0 before:transition-all before:ease-out before:duration-300 before:rounded-md ${isMobileMenuOpened && `before:rotate-45 before:origin-center before:top-1/2`}`)}
          >
            <i
              className={cn(
                `block indent-[100%] whitespace-nowrap overflow-hidden h-[2.5px] bg-text w-full absolute top-1/2 transition-transform ease-out duration-100 rounded-md ${isMobileMenuOpened && `opacity-0`}`,
              )}
            >
              Menu
            </i>
          </button>
        </div>
      </nav>

      <nav
        aria-label="Mobile navigation"
        className={cn(
          `fixed bg-bg-main top-0 right-0 w-full h-screen transition-transform duration-200 z-20 hidden max-md:flex max-md:flex-col max-md:justify-between px-[20px] pb-[54px] ${isMobileMenuOpened ? `translate-y-0` : `-translate-y-full`}`,
        )}
      >
        <ul className="mt-[90px]">
          <li className="py-[12px] border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link href="#" className="flex items-center justify-between">
              <span className="text-[19px]">My listings</span>
              <ChevronRight size={22} />
            </Link>
          </li>
          <li className="py-[12px] border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link href="#" className="flex items-center justify-between">
              <span className="text-[19px]">My bookings</span>
              <ChevronRight size={22} />
            </Link>
          </li>
          <li className="py-[12px] border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link href="#" className="flex items-center justify-between">
              <span className="text-[19px]">My rentals</span>
              <ChevronRight size={22} />
            </Link>
          </li>
          <li className="py-[12px] border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link href="#" className="flex items-center justify-between">
              <span className="text-[19px]">Profile</span>
              <ChevronRight size={22} />
            </Link>
          </li>
        </ul>

        <div>
          <CtaButton
            text="List your item"
            className="w-full py-[12px] text-base"
          />
          {user ? (
            <CtaButton
              text="Logout"
              className="bg-transparent text-text border border-primary-200 w-full mt-[20px] py-[12px] text-base hover:bg-primary-100"
              onClick={handleSignOut}
            />
          ) : (
            <Link
              href="/signup"
              className="w-full py-3 block border border-primary-200 text-center mt-5 hover:bg-primary-100 rounded-md"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
