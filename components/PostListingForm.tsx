"use client";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import CtaButton from "./CtaButton";

const PostListingForm = () => {
  const [photos, setPhotos] = useState<(File | null)[]>(Array(6).fill(null));
  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>(
    Array(6).fill(null),
  );

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const file = e.target.files?.[0] ?? null;

    setPhotos((prev) => {
      const updated = [...prev];
      updated[idx] = file;
      return updated;
    });

    setPhotoPreviews((prev) => {
      const updated = [...prev];
      updated[idx] = file ? URL.createObjectURL(file) : null;
      return updated;
    });
  };

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 10 + "px";
  };
  return (
    <form className="mt-[24px] p-4 shadow-post-form bg-bg-main rounded-md w-[564px]">
      <div className="space-y-[24px]">
        {/* CATEGORY  */}
        <div className="space-y-3">
          <label htmlFor="" className="block font-medium text-sm">
            Category
          </label>
          <input
            type="text"
            id=""
            name=""
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="E.g: Car equipment"
          />
        </div>
        {/* TITLE  */}
        <div className="space-y-3">
          <label htmlFor="" className="block font-medium text-sm">
            Title
          </label>
          <input
            type="text"
            id=""
            name=""
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="Eg. X Pen Innovator 321"
          />
        </div>
        {/* DESCRIPTION  */}
        <div className="space-y-3">
          <label htmlFor="" className="block font-medium text-sm">
            Description
          </label>
          <textarea
            id=""
            name=""
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
            [&::-webkit-scrollbar]:w-[7px]
            [&::-webkit-scrollbar-track]:bg-[#ffede6]
            [&::-webkit-scrollbar-thumb]:bg-[#ffcebd]
            [&::-webkit-scrollbar-thumb]:rounded-full"
            placeholder="Describe the item in as much detail as possible"
            onChange={handleTextAreaInput}
          ></textarea>
        </div>
        {/* PICTURES  */}
        <div className="space-y-3">
          <label htmlFor="" className="block font-medium text-sm">
            Photos
          </label>
          <div className="grid grid-cols-3 gap-[8px]">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <label
                  style={{
                    backgroundImage: photoPreviews[idx]
                      ? `url("${photoPreviews[idx]}")`
                      : "none",
                  }}
                  className="bg-primary-100/40 h-[140px] rounded-md flex items-center justify-center cursor-pointer border border-primary-200/50 bg-center bg-cover"
                  htmlFor={`image-input-${idx}`}
                >
                  {!photos[idx] && (
                    <ImagePlus strokeWidth={1} color="#FFCEBD" size={49} />
                  )}
                </label>
                <input
                  type="file"
                  accept="image/png, image/webp, image/jpg"
                  className="hidden"
                  id={`image-input-${idx}`}
                  onChange={(e) => handlePhotoChange(e, idx)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* PICKUP LOCATION */}
        <div className="space-y-3">
          <label htmlFor="" className="block font-medium text-sm">
            Pickup location
          </label>
          <input
            type="text"
            id=""
            name=""
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="123 Main St, New York, NY 10001"
          />
        </div>
        {/* PRICES  */}
        <div className="">
          <p className="font-medium text-sm">Prices</p>
          <div className="flex gap-[30px] mt-3">
            <div className="space-y-1 flex-1">
              <label htmlFor="" className="text-sm block">
                Price for 1 day
              </label>
              <input
                min={0}
                type="number"
                id=""
                name=""
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Eg: $10"
              />
            </div>
            <div className="space-y-1 flex-1">
              <label htmlFor="" className="text-sm block">
                Price for 1 week
              </label>
              <input
                min={0}
                type="number"
                id=""
                name=""
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="E.g $70"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-[48px]">
          <CtaButton
            text="Reset form"
            className="bg-transparent text-text border border-primary-300 hover:bg-primary-100"
            type="button"
          />
          <CtaButton text="Post listing" className="text-base" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PostListingForm;
