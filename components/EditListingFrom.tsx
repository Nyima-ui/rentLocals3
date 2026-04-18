"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { updateListingAction } from "@/lib/action";
import { ImagePlus, X } from "lucide-react";
import CtaButton from "./CtaButton";

const EditListingForm = ({ listing }: { listing: Listing }) => {
  const existingPictures = (listing.pictures ?? []).slice(0, 6);

  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>([
    ...existingPictures,
    ...Array(6 - existingPictures.length).fill(null),
  ]);

  const [photos, setPhotos] = useState<(File | null)[]>(Array(6).fill(null));

  const [keptPhotos, setKeptPhotos] = useState<(string | null)[]>([
    ...existingPictures,
    ...Array(6 - existingPictures.length).fill(null),
  ]);

  const [loading, setLoading] = useState(false);
  const [photoError, setPhotoError] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePhotoRemove = (idx: number) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });

    setPhotoPreviews((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });

    setKeptPhotos((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const file = e.target.files?.[0] ?? null;

    if (file) setPhotoError(false);

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

    setKeptPhotos((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });
  };

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 10 + "px";
  };

  useEffect(() => {
    const hasPhoto = photoPreviews.some((p) => p !== null);
    setPhotoError(!hasPhoto);
  }, [photoPreviews]);

  useEffect(() => {
    if (textAreaRef.current) {
      const el = textAreaRef.current;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + 10 + "px";
    }
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    keptPhotos.forEach((url) => {
      if (url) formData.append("kept_picture", url);
    });

    photos.forEach((file) => {
      if (file) formData.append("new_picture", file);
    });

    try {
      setLoading(true);
      await updateListingAction(formData, listing.id, user.id);
      router.push("/dashboard/mylistings");
    } catch (error) {
      console.error(`Error updating listing`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("photos", photos);
  }, [photos]);

  return (
    <form
      className="mt-[24px] p-4 shadow-post-form bg-bg-main rounded-md w-[564px] max-md:w-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-[24px]">
        {/* CATEGORY  */}
        <div className="space-y-3">
          <label htmlFor="category" className="block font-medium text-sm">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="E.g: Car equipment"
            required
            defaultValue={listing.category}
          />
        </div>
        {/* TITLE  */}
        <div className="space-y-3">
          <label htmlFor="title" className="block font-medium text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="Eg. X Pen Innovator 321"
            required
            defaultValue={listing.title}
          />
        </div>
        {/* DESCRIPTION  */}
        <div className="space-y-3">
          <label htmlFor="description" className="block font-medium text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
            [&::-webkit-scrollbar]:w-[7px]
            [&::-webkit-scrollbar-track]:bg-[#ffede6]
            [&::-webkit-scrollbar-thumb]:bg-[#ffcebd]
            [&::-webkit-scrollbar-thumb]:rounded-full"
            placeholder="Describe the item in as much detail as possible"
            onChange={handleTextAreaInput}
            required
            defaultValue={listing.description}
            ref={textAreaRef}
          ></textarea>
        </div>
        {/* PICTURES  */}
        <fieldset className="space-y-3">
          <legend className="block font-medium text-sm">Photos</legend>

          <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-[8px]">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="relative h-[140px]">
                <label
                  style={{
                    backgroundImage: photoPreviews[idx]
                      ? `url("${photoPreviews[idx]}")`
                      : "none",
                  }}
                  className="bg-primary-100/40 h-[140px] rounded-md flex items-center justify-center cursor-pointer border border-primary-200/50 bg-center bg-cover"
                  htmlFor={`image-input-${idx}`}
                >
                  {!photoPreviews[idx] && (
                    <ImagePlus strokeWidth={1} color="#FFCEBD" size={49} />
                  )}
                </label>
                <input
                  type="file"
                  accept="image/png, image/webp, image/jpg"
                  className="hidden"
                  name="picture"
                  id={`image-input-${idx}`}
                  onChange={(e) => handlePhotoChange(e, idx)}
                />
                {photoPreviews[idx] && (
                  <button
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      cursor: "pointer",
                      borderRadius: "0.375rem",
                      zIndex: 10,
                    }}
                    className="hover:bg-primary-200 rounded-md"
                    type="button"
                    onClick={(e) => {
                      handlePhotoRemove(idx);
                      e.stopPropagation();
                    }}
                  >
                    <X strokeWidth={2} color="#ff6242" size={22} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {photoError && (
            <p className="text-sm text-red-600 font-medium">
              Please upload at least one photo of your listing.
            </p>
          )}
        </fieldset>
        {/* PICKUP LOCATION */}
        <div className="space-y-3">
          <label htmlFor="location" className="block font-medium text-sm">
            Pickup location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25"
            placeholder="123 Main St, New York, NY 10001"
            required
            autoComplete="street-address"
            defaultValue={listing.location}
          />
        </div>
        {/* PRICES  */}
        <fieldset>
          <legend className="font-medium text-sm">Prices</legend>
          <div className="flex gap-[30px] mt-3">
            <div className="space-y-1 flex-1">
              <label htmlFor="price-day" className="text-sm block">
                Price for 1 day
              </label>
              <input
                min={0}
                type="number"
                id="price-day"
                name="price-day"
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Eg: $10"
                required
                defaultValue={listing.price_day}
              />
            </div>
            <div className="space-y-1 flex-1">
              <label htmlFor="price-week" className="text-sm block">
                Price for 1 week
              </label>
              <input
                min={0}
                type="number"
                id="price-week"
                name="price-week"
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary shadow-sm shadow-primary-200/25
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="E.g $70"
                defaultValue={listing.price_week ? listing.price_week : 0}
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end gap-4 mt-[48px]">
          <CtaButton
            text="Reset form"
            className="bg-transparent text-text border border-primary-300 hover:bg-primary-100"
            type="button"
          />
          <CtaButton
            text="Update listing"
            className=""
            type="submit"
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default EditListingForm;
