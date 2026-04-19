import BackButton from "@/components/BackButton";
import { fetchUserRentalsAction } from "@/lib/action";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formateDatetoDayMonthYear } from "@/lib/utils";
import CtaButton from "@/components/CtaButton";
import Link from "next/link";
import Footer from "@/components/Footer";

export const statusPriority: Record<string, number> = {
  pending: 0,
  active: 1,
  accepted: 2,
  returned: 3,
  declined: 4,
  canclled: 5,
};

const MyRentalsPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signup");

  const userRentals: Booking[] = await fetchUserRentalsAction(user.id);

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-400/60 text-amber-800 border border-amber-400/40",
    accepted: "bg-emerald-400/20 text-emerald-800 border border-emerald-400/40",
    cancelled: "bg-zinc-400/50 text-zinc-800 border border-zinc-400/40",
    declined: "bg-rose-400/20 text-rose-800 border border-rose-400/40",
    returned: "bg-violet-400/20 text-violet-800 border border-violet-400/40",
    active: "bg-blue-400/20 text-blue-800 border border-blue-400/40",
  };

  const sortedRentals = [...userRentals].sort(
    (a, b) =>
      (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99),
  );

  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5 mb-10">
      <BackButton classname="mt-7 max-md:mt-20" />
      {userRentals.length > 0 ? (
        <>
          <h1 className="text-[27px] mt-6">My bookings</h1>
          <ul className="mt-5">
            {sortedRentals.map((booking) => (
              <li
                key={booking.id}
                className="flex gap-3 bg-linear-to-r from-primary-100 to-primary-200/70 mt-3 p-3 rounded-md"
              >
                <div>
                  <Image
                    height={45}
                    width={45}
                    alt={booking.renter.fullname}
                    src={booking.renter.avatar}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between flex-1 items-start gap-3">
                    <p className="font-medium text-[20px] max-md:text-base">
                      {booking.listing.title}
                    </p>
                    <div
                      className={`py-0.5 px-2 rounded-md ${statusStyles[booking.status]}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </div>
                  </div>
                  <p className="mt-0.5 max-md:mt-0 text-text/80 max-md:text-sm">
                    Rental period:{" "}
                    <span>{formateDatetoDayMonthYear(booking.start_date)}</span>
                    <span>-</span>
                    <span>{formateDatetoDayMonthYear(booking.end_date)}</span>
                  </p>
                  <Link
                    href={`/booking/${booking.id}`}
                    className="mt-3 max-md:mt-3 block w-fit"
                  >
                    <CtaButton
                      text="View details"
                      className="text-text bg-transparent border border-primary-400 hover:bg-primary-200 transition-colors duration-150 ease-in  py-2 px-3"
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="h-[80vh] flex items-center justify-center -translate-y-3">
          <div className="flex flex-col items-center">
            <Image
              height={84}
              width={78}
              alt="Note illustration"
              src={"/note.svg"}
            />
            <h1 className="font-syne text-[27px] mt-2">No rentals yet</h1>
            <p className="max-w-[384px] text-center leading-tight text-text/60 text-sm mt-1">
              When someone rents from you, it&apos;ll show up here.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyRentalsPage;
