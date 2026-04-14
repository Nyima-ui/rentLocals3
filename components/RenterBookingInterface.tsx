"use client";
import Image from "next/image";
import { useState } from "react";
import Chat from "./Chat";
import StepIndicator from "./StepIndicator";
import Link from "next/link";
import { ChevronRight, CalendarCheck } from "lucide-react";
import {
  formateDatetoDayMonthYear,
  getBookingStatusMessage,
} from "@/lib/utils";
import CtaButton from "./CtaButton";

const RenterBookingInterface = ({ booking }: { booking: Booking }) => {
  const [previewImage, setPreviewImage] = useState(booking.listing.pictures[0]);
  return (
    <section aria-labelledby="booking-heading">
      <h2 className="sr-only" id="booking-heading">
        Booking details
      </h2>

      <div className="flex gap-7 max-lg:flex-col">
        {/* LEFT SIDE  */}
        <div className="mt-[54px] max-md:mt-[100px] w-[58%] max-lg:w-full">
          {/* FIRST CARD  */}
          <div className="flex items-end gap-3">
            <div className="rounded-md overflow-hidden flex-1 h-full">
              <Image
                width={636}
                height={410}
                src={previewImage}
                alt={booking.listing.title}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 max-sm:gap-1.5">
              {booking.listing.pictures.length > 1 &&
                booking.listing.pictures.map((img, idx) => (
                  <button
                    className="overflow-hidden block cursor-pointer rounded-md max-sm:size-[48px]"
                    key={idx}
                    onClick={() => setPreviewImage(img)}
                  >
                    <Image
                      height={72}
                      width={72}
                      src={img}
                      alt={booking.listing.title}
                      className="max-sm:w-full max-sm:h-full max-sm:object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>
          {/* SECOND CARD  */}
          <article className="border border-primary-200 rounded-md p-4 w-[calc(100%-84px)] mt-3 max-xl:w-full">
            <StepIndicator
              status={booking.status}
              statusHistory={booking.status_history}
            />
            <div className="flex gap-4 items-center my-10">
              <Image
                height={50}
                width={50}
                src={booking.owner.avatar}
                alt={booking.owner.fullname}
              />
              <p className="leading-tight max-w-[567px]">
                {getBookingStatusMessage({
                  renter: booking.renter.fullname,
                  owner: booking.owner.fullname,
                  status: booking.status,
                  listing: booking.listing.title,
                  role: "renter",
                })}
              </p>
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
            <CtaButton
              text="Cancel request"
              className="text-text bg-transparent hover:bg-primary-100 border-2 border-primary-300 mt-8"
            />
          </article>
        </div>
        {/* RIGHT SIDE  */}
        <Chat booking={booking} messageTo={booking.owner.fullname} />
      </div>
    </section>
  );
};

export default RenterBookingInterface;
