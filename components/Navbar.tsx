"use client";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "./CtaButton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isDropDownOpened, setisDropDownOpened] = useState(false);
  const [isMobileMenuOpened, setisMobileMenuOpened] = useState(false);
  const [bookingRequests, setBookingRequests] = useState(0);
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setisDropDownOpened(false);
    router.push("/");
  };

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpened]);

  const checkBookingRequests = async () => {
    try {
      const supabase = createClient();
      if (!user) return;

      const { data, error } = await supabase
        .from("booking")
        .select("*")
        .eq("owner_id", user.id)
        .eq("status", "pending");

      if (error) throw error;

      setBookingRequests(data.length);
    } catch (error) {
      console.error(`Error checking booking requests, ${error}`);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    if (!user) return;

    checkBookingRequests();

    const channel = supabase
      .channel(`booking-requests-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "booking",
          filter: `owner_id=eq.${user.id}`,
        },
        () => {
          checkBookingRequests();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <>
      <header className="shadow-nav relative">
        {/* DESKTOP  */}
        <nav
          className="px-20 max-lg:px-10 max-sm:px-5 w-full mx-auto flex justify-between items-center py-2.5 max-md:hidden"
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

          <ul className="flex gap-9 max-lg:gap-4 items-center" role="list">
            <li>
              <Link
                href={"/dashboard/mylistings"}
                className="px-3 py-1 relative after:absolute after:bottom-0 after:left-2 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-200 after:ease-in hover:after:w-full"
              >
                Listings
              </Link>
            </li>
            <li className="relative">
              <Link
                href={"/dashboard/mybookings"}
                className="px-3 py-1 relative after:absolute after:bottom-0 after:left-2 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-200 after:ease-in hover:after:w-full"
              >
                Bookings
              </Link>
            </li>
            <li className="relative">
              <Link
                href={"/dashboard/myrentals"}
                className="px-3 py-1 relative after:absolute after:bottom-0 after:left-2 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-200 after:ease-in hover:after:w-full"
              >
                Rentals
              </Link>
              {bookingRequests > 0 && (
                <span className="absolute -top-1 -right-1 flex size-4 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 backdrop-opacity-85"></span>
                  <span className="rounded-full w-full h-full text-[12px] flex items-center justify-center bg-primary text-white leading-tight">
                    {bookingRequests}
                  </span>
                </span>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <div className="relative">
              {profile?.avatar ? (
                <button
                  className="rounded-full overflow-hidden size-10 cursor-pointer"
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
                <ul className="absolute top-full right-0 w-28.75 bg-primary-100 py-2 rounded-md shadow-sm shadow-primary-400/70  translate-y-2 z-10">
                  <li className="px-2 hover:bg-primary-200">
                    <Link href="/">Profile</Link>
                  </li>
                  <li className="px-2 cursor-pointer mt-1">
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
              <CtaButton
                text="List your item"
                className="hover:opacity-90 transition-opacity duration-100 ease-in"
              />
            </Link>
          </div>
        </nav>
      </header>
      {/* MOBILE  */}
      <nav className="max-lg:px-10 max-sm:px-5 hidden max-md:flex py-3 rounded-md border border-primary-200/40 items-center justify-between fixed top-0 left-0 w-full bg-bg-main z-30">
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
          className="h-4 relative border-red-600"
          onClick={() => setisMobileMenuOpened((prev) => !prev)}
        >
          <button
            className={cn(`block w-6.25 h-4 cursor-pointer
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
          {bookingRequests > 0 && (
            <span className="absolute -top-2 -right-2 flex size-4 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 backdrop-opacity-85"></span>
              <span className="rounded-full w-full h-full text-[12px] flex items-center justify-center bg-primary text-white leading-tight">
                {bookingRequests}
              </span>
            </span>
          )}
        </div>
      </nav>

      <nav
        aria-label="Mobile navigation"
        className={cn(
          `fixed bg-bg-main top-0 right-0 w-full h-screen transition-transform duration-200 z-20 hidden max-md:flex max-md:flex-col max-md:justify-between px-5 pb-13.5 ${isMobileMenuOpened ? `translate-y-0` : `-translate-y-full`}`,
        )}
      >
        <ul className="mt-22.5">
          <li className="py-3 border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link
              href="/dashboard/mylistings"
              className="flex items-center justify-between"
              onClick={() => setisMobileMenuOpened(false)}
            >
              <span className="text-[19px]">My listings</span>
              <ChevronRight size={22} />
            </Link>
          </li>
          <li className="py-3 border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link
              href="/dashboard/mybookings"
              className="flex items-center justify-between"
              onClick={() => setisMobileMenuOpened(false)}
            >
              <span className="text-[19px]">My bookings</span>
              <ChevronRight size={22} />
            </Link>
          </li>
          <li className="py-3 border-b-2 border-primary-200/50 hover:bg-primary-100 relative">
            <Link
              href="/dashboard/myrentals"
              className="flex items-center justify-between"
              onClick={() => setisMobileMenuOpened(false)}
            >
              <span className="text-[19px]">My rentals</span>
              <ChevronRight size={22} />
              {bookingRequests > 0 && (
                <span className="absolute top-4.5 right-8 flex size-4 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 backdrop-opacity-85"></span>
                  <span className="rounded-full w-full h-full text-[12px] flex items-center justify-center bg-primary text-white leading-tight">
                    {bookingRequests}
                  </span>
                </span>
              )}
            </Link>
          </li>
          {/* <li className="py-3 border-b-2 border-primary-200/50 hover:bg-primary-100">
            <Link href="#" className="flex items-center justify-between">
              <span className="text-[19px]">Profile</span>
              <ChevronRight size={22} />
            </Link>
          </li> */}
        </ul>

        <div>
          <Link
            href="/listing/new"
            onClick={() => setisMobileMenuOpened(false)}
          >
            <CtaButton
              text="List your item"
              className="w-full py-3 text-base"
            />{" "}
          </Link>
          {user ? (
            <CtaButton
              text="Logout"
              className="bg-transparent text-text border border-primary-200 w-full mt-5 py-3 text-base hover:bg-primary-100"
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
