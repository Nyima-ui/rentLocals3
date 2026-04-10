"use client"
import { Calendar as ShadCnCalendar } from "./ui/calendar";

const Calendar = ({ listing }: { listing: Listing }) => {
  return (
    <div className="max-w-[412px]">
      <h1 className="text-[33px] font-medium leading-tight">{listing.title}</h1>
      <p className="text-sm uppercase font-medium mt-3">{listing.category}</p>
      <ShadCnCalendar
        className="w-[340px] rounded-md border border-primary-200 mt-[32px] shadow-md shadow-primary-200/30"
        mode="range"
        weekStartsOn={1}
        formatters={{
          formatWeekdayName: (day, options) =>
            day.toLocaleDateString(options?.locale?.code, { weekday: "short" }),
        }}
      />
    </div>
  );
};

export default Calendar;
