"use client";
import BackButton from "./BackButton";
import Chat from "./Chat";
import Image from "next/image";
import StepIndicator from "./StepIndicator";
import Link from "next/link";
import { ChevronRight, CalendarCheck } from "lucide-react";
import { formateDatetoDayMonthYear } from "@/lib/utils";
import CtaButton from "./CtaButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetBookingStatusStatusMessage from "./StatusMessage";
import { createClient } from "@/lib/supabase/client";
import {
  ownerAcceptAction,
  fetchListingAddress,
  ownerDeclineAction,
} from "@/lib/action";

const OwnerBookingInterface = ({ booking }: { booking: Booking }) => {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(booking);
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleAccept = async () => {
    try {
      setAcceptLoading(true);
      const data = await ownerAcceptAction(booking);
      setCurrentBooking((prev) => ({ ...prev, ...data }));
      fetchListingAddress(booking.listing_id).then(setLocation);
      // router.refresh();
    } catch (error) {
      console.error(`Error updating booking status to accepted ${error}`);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      setDeclineLoading(true);
      await ownerDeclineAction(booking);
      // router.refresh();
    } catch (error) {
      console.error(`Error declining the booking ${error}`);
    } finally {
      setDeclineLoading(false);
    }
  };

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`owner-booking-${booking.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "booking",
          filter: `id=eq.${booking.id}`,
        },
        (payload) => {
          setCurrentBooking((prev) => ({ ...prev, ...payload.new }));

          supabase
            .from("booking_status_history")
            .select("id, status, created_at")
            .eq("booking_id", booking.id)
            .then(({ data }) => {
              if (data) {
                setCurrentBooking((prev) => ({
                  ...prev,
                  status_history: data,
                }));
              }
            });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking.id]);

  useEffect(() => {
    const statusesWithAddressAccess = ["accepted", "active"];
    if (statusesWithAddressAccess.includes(booking.status)) {
      fetchListingAddress(booking.listing_id).then(setLocation);
    }
  }, [booking.status, booking.listing_id]);

  return (
    <>
      <BackButton classname="mt-7 max-md:mt-[86px]" />
      <h1 className="text-[27px] mt-5">Booking request</h1>
      <div className="flex gap-7 items-start max-lg:flex-col">
        {/* LEFT  */}
        <div className="border border-primary-200 rounded-md px-4 pt-6 pb-4 mt-8 space-y-8 w-[58%] max-lg:w-full flex-start">
          <StepIndicator
            status={currentBooking.status}
            statusHistory={currentBooking.status_history}
          />

          <div className="flex gap-4 items-center">
            <Image
              height={50}
              width={50}
              src={booking.renter.avatar}
              alt={booking.renter.fullname}
              className="rounded-full"
            />
            <div>
              {currentBooking.status === "pending" && (
                <h2 className="text-[19px]">Action required</h2>
              )}
              <p>
                <GetBookingStatusStatusMessage
                  config={{
                    renter: booking.renter.fullname,
                    owner: booking.owner.fullname,
                    status: currentBooking.status,
                    listing: booking.listing.title,
                    role: "owner",
                  }}
                />
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
            <dd>
              {location
                ? location
                : "Full address revealed after the payment is confirmed."}
            </dd>

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

          {currentBooking.status !== "declined" && (
            <div className="flex items-center gap-6 mt-1">
              <CtaButton
                text="Decline"
                className="bg-transparent text-text border border-primary-200 hover:bg-primary-100 "
                loading={declineLoading}
                onClick={handleDecline}
              />
              {currentBooking.status !== "accepted" && (
                <CtaButton
                  text="Accept"
                  className=""
                  onClick={handleAccept}
                  loading={acceptLoading}
                />
              )}
            </div>
          )}
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
