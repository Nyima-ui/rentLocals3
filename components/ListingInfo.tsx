"use client";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const ListingInfo = ({ listing }: { listing: SingleListing }) => {
  const [previewImage, setPreviewImage] = useState(listing.pictures[0]);
  const { user } = useAuth();

  const isOwner = listing?.owner_id === user?.id;

  return (
    <div className="flex-1">
      {/* IMAGES  */}
      <div>
        <div className="">
          <Image
            width={737}
            height={552}
            src={previewImage}
            alt={listing.title}
            className="rounded-md w-full h-full object-cover"
          />
        </div>
        {listing.pictures.length > 0 && (
          <div className="flex justify-end gap-3 mt-3">
            {listing.pictures.map((img) => (
              <button key={img} onClick={() => setPreviewImage(img)}>
                <Image
                  width={80}
                  height={80}
                  src={img}
                  alt={listing.title}
                  className="rounded-md cursor-pointer"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* OWNER INFO  */}
      <h2 className="mt-6 font-semibold uppercase text-sm">owned by</h2>
      <article className="mt-3 rounded-md border border-primary-200 px-3 py-2 relative">
        <div className="">
          <div className="absolute top-2 left-3 w-[calc(100%-24px)] bg-primary-100 h-[48px] rounded-t-md"></div>
          <div className="relative z-10 translate-y-3 translate-x-2">
            {listing.owner?.avatar && (
              <Image
                height={50}
                width={50}
                src={listing.owner.avatar}
                alt={listing.owner.fullname}
                className="rounded-full"
              />
            )}
          </div>
          <p className="mt-5 font-medium">{listing.owner.fullname}</p>
          {!isOwner && (
            <p className="mt-2 text-sm text-text">
              Want to ask the owner something? Send a booking request to start a
              conversation.
            </p>
          )}
        </div>
      </article>

      {/* DESCRIPTION  */}
      <div className="rounded-md border border-primary-200 px-3 py-2 mt-6">
        <div>
          <h3 className="font-semibold uppercase text-sm">Description</h3>
          <p className="mt-3">{listing.description}</p>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold uppercase text-sm">Prices</h3>
          <div className="flex items-center gap-5 mt-3">
            <div className="border border-primary-200 rounded-md py-2 px-4">
              <span className="font-medium"> ${listing.price_day}</span>
              <span className="text-sm ml-px">/day</span>
            </div>
            <div className="border border-primary-200 rounded-md py-2 px-4">
              <span className="font-medium">${listing.price_week}</span>
              <span className="text-sm ml-px">/week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
