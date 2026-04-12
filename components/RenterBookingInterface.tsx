"use client";
import Image from "next/image";
import { useState } from "react";
import Chat from "./Chat";
import StepIndicator from "./StepIndicator";

const RenterBookingInterface = ({ booking }: { booking: Booking }) => {
  const [previewImage, setPreviewImage] = useState(booking.listing.pictures[0]);
  return (
    <section>
      <div className="flex">
        {/* LEFT SIDE  */}
        <div>
          <div className="flex items-end gap-3 mt-[54px]">
            {/* MAIN IMAGE  */}
            <div className="rounded-md overflow-hidden border">
              <Image
                width={636}
                height={410}
                src={previewImage}
                alt={booking.listing.title}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
            {/* OTHER IMAGE OF LISTING  */}
            <div className="border">
              {booking.listing.pictures.length > 1 &&
                booking.listing.pictures.map((img, idx) => (
                  <button
                    className="overflow-hidden mt-3 block cursor-pointer rounded-md"
                    key={idx}
                    onClick={() => setPreviewImage(img)}
                  >
                    <Image
                      height={72}
                      width={72}
                      src={img}
                      alt={booking.listing.title}
                    />
                  </button>
                ))}
            </div>
          </div>
          <div className="border border-primary-200 rounded-md p-4 w-[calc(100%-90px)] mt-3">
            <StepIndicator
              status={booking.status}
              statusHistory={booking.status_history}
            />
          </div>
        </div>
        {/* RIGHT SIDE  */}
        <Chat />
      </div>
    </section>
  );
};

export default RenterBookingInterface;
