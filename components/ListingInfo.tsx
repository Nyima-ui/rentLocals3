"use client";
import Image from "next/image";
import { useState } from "react";

const ListingInfo = ({ listing }: { listing: Listing }) => {
  const [previewImage, setPreviewImage] = useState(listing.pictures[0]);
  return (
    <div className="flex-1">
      <div>
        <div className="">
          <Image
            width={737}
            height={552}
            src={previewImage}
            alt=""
            className="rounded-md w-full h-full object-cover"
          />
        </div>
        {listing.pictures.length > 0 && (
          <div className="flex justify-end gap-3 mt-3">
            {listing.pictures.map((img) => (
              <div key={img} onClick={() => setPreviewImage(img)}>
                <Image
                  width={80}
                  height={80}
                  src={img}
                  alt=""
                  className="rounded-md cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingInfo;
