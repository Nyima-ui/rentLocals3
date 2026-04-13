import BackButton from "./BackButton";
import Chat from "./Chat";
import Image from "next/image";
import StepIndicator from "./StepIndicator";
import Link from "next/link";
import { ChevronRight, CalendarCheck } from "lucide-react";
import { formateDatetoDayMonthYear } from "@/lib/utils";
import CtaButton from "./CtaButton";

const OwnerBookingInterface = ({ booking }: { booking: Booking }) => {
  return (
    <>
      <BackButton classname="mt-7 max-md:mt-[86px]" />
      <h1 className="text-[27px] mt-5">Booking request</h1>
      <div className="flex gap-7 items-start max-lg:flex-col">
        {/* LEFT  */}
        <div className="border border-primary-200 rounded-md px-4 pt-6 pb-4 mt-8 space-y-8 w-[58%] max-lg:w-full flex-start">
          <StepIndicator
            status={booking.status}
            statusHistory={booking.status_history}
          />

          <div className="flex gap-4 items-start">
            <Image
              height={50}
              width={50}
              src={booking.renter.avatar}
              alt={booking.renter.fullname}
              className="rounded-full"
            />
            <div>
              <h2 className="text-[19px]">Action required</h2>
              <p>
                <span className="text-primary mr-0.5 max-md:mx-0">
                  {booking.renter.fullname}
                </span>{" "}
                has requested to rent your{" "}
                <span className="text-primary mx-0.5 max-md:mx-0">
                  {booking.listing.title}
                </span>{" "}
              </p>
            </div>
          </div>

          <Link
            href={`/listing/${booking.listing_id}`}
            className="text-[24px] flex items-center gap-10 font-medium hover:opacity-75"
          >
            <span>{booking.listing.title}</span>
            <ChevronRight size={20} strokeWidth={1.5} />
          </Link>

          <dl className="grid grid-cols-2 gap-y-6 mt-5">
            <dt>Booking ID</dt>
            <dd>{booking.id}</dd>

            <dt>Location</dt>
            <dd>Full address revealed after the payment is confirmed.</dd>

            <div>
              <div className="flex items-center gap-1 text-text/60">
                <CalendarCheck size={16} />
                <dt>Pick up</dt>
              </div>
              <time dateTime={booking.start_date}>
                {formateDatetoDayMonthYear(booking.start_date)}
              </time>
            </div>

            <div>
              {" "}
              <div className="flex items-center gap-1 text-text/60">
                <CalendarCheck size={16} />
                <dt>Drop off</dt>
              </div>
              <time dateTime={booking.end_date}>
                {formateDatetoDayMonthYear(booking.end_date)}
              </time>
            </div>

            <div className="grid grid-cols-2 col-span-2 gap-y-1">
              <dt>Price per day</dt>
              <dd>${booking.price_day}</dd>

              <dt>Total</dt>
              <dd className="text-primary font-semibold">${booking.total}</dd>
            </div>
          </dl>

          <div className="flex items-center gap-6 mt-1">
            <CtaButton
              text="Decline"
              className="bg-transparent text-text border border-primary-200 hover:bg-primary-100"
            />
            <CtaButton text="Accept" />
          </div>
        </div>
        {/* RIGHT  */}

        <Chat
          booking={booking}
          classname="mt-8 max-lg:w-full"
          messageTo={booking.renter.fullname}
        />
      </div>
    </>
  );
};

export default OwnerBookingInterface;
