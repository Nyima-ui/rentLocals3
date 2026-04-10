"use client";
import dynamic from "next/dynamic";
import CtaButton from "./CtaButton";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { calculatePrice, formatDate } from "@/lib/utils";

const ShadCnCalendar = dynamic(
  () => import("./ui/calendar").then((mod) => mod.Calendar),
  { ssr: false },
);

const Calendar = ({ listing }: { listing: Listing }) => {
  const [range, setRange] = useState<DateRange | undefined>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days =
    range?.from && range?.to
      ? Math.round(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const total =
    days > 0
      ? calculatePrice(days, listing.price_day, listing.price_week)
      : null;

  return (
    <div className="max-w-103">
      <h1 className="text-[33px] font-medium leading-tight">{listing.title}</h1>
      <p className="text-sm uppercase font-medium mt-3">{listing.category}</p>
      <ShadCnCalendar
        className="w-85 rounded-md border border-primary-200 mt-8 shadow-md shadow-primary-200/30"
        mode="range"
        selected={range}
        onSelect={setRange}
        weekStartsOn={1}
        disabled={{ before: today }}
        formatters={{
          formatWeekdayName: (day, options) =>
            day.toLocaleDateString(options?.locale?.code, { weekday: "short" }),
        }}
      />

      <div className="mt-8 max-w-85">
        <div className="grid grid-cols-2 gap-y-3">
          <span className="text-sm font-medium">Pickup</span>
          <span className="text-sm">
            {range?.from ? formatDate(range.from) : "Select date"}
          </span>

          <span className="text-sm font-medium">Drop off</span>
          <span className="text-sm">
            {range?.to ? formatDate(range.to) : "Select date"}
          </span>

          <p className="col-span-2 h-px bg-primary-200" aria-label="hidden"></p>

          <span className="font-medium">Total</span>
          <span className="text-[23px] font-semibold">
            {total !== null ? `$${total}` : "-"}
          </span>
        </div>
        <CtaButton text="Request Booking" className="mt-5" />
      </div>
    </div>
  );
};

export default Calendar;
