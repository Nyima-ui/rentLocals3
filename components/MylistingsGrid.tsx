"use client";
import Image from "next/image";
import CtaButton from "./CtaButton";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { deleteListingAction } from "@/lib/action";
import { useRouter } from "next/navigation";

export const DeletePopUp = ({
  setIsDeletePopUp,
  listingId,
}: {
  setIsDeletePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteListingAction(listingId);
      router.refresh();
    } catch (error) {
      console.error(`Error deleting the listing ${error}`);
    } finally {
      setLoading(false);
      setIsDeletePopUp(false);
    }
  };

  return (
    <div
      className="overlay fixed inset-0 flex justify-center items-center backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="bg-bg-main p-4 rounded-md flex flex-col items-center relative">
        <button
          className="absolute top-3 right-3 cursor-pointer opacity-45 hover:opacity-100 active:border active:border-text/50 rounded-md"
          onClick={() => setIsDeletePopUp(false)}
          aria-label="Close delete dialog"
        >
          <X strokeWidth={1.9} size={20} />
        </button>
        <span className="bg-[#F5978D]/20 p-2 rounded-full" aria-hidden="true">
          <CircleAlert color="#F5978D" />
        </span>
        <h3 className="font-medium mt-6" id="delete-dialog-title">
          Delete this listing?
        </h3>
        <p className="mt-3 max-w-[293px] text-center text-sm text-text/80">
          This will permanently remove your listing from RentLocals. This action
          can&apos;t be undone.
        </p>

        <div className="flex mt-8 gap-4 w-full">
          <CtaButton
            text="Cancel"
            className="w-full bg-transparent border border-transparent hover:border-text/20 text-text transition-all duration-150 ease-in"
            onClick={() => setIsDeletePopUp(false)}
          />
          <CtaButton
            text="Delete"
            className="w-full bg-[#F5978D]/20 text-text border border-[#F5978D] hover:bg-[#F5978D]/50 transition-colors duration-150 ease-in"
            onClick={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export const MyListingCard = ({ listing }: { listing: Listing }) => {
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  return (
    <article className="bg-primary-100 rounded-md p-2 hover:shadow-sm hover:shadow-primary-200">
      <Link href={`/listing/${listing.id}`}>
        <div className="overflow-hidden h-58.5 max-sm:h-[270px] rounded-[2.5px] w-full">
          <Image
            height={244}
            width={244}
            src={listing.pictures[0]}
            alt={listing.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </Link>

      <Link href={`/listing/${listing.id}`}>
        <div className="mt-2">
          <p className="line-clamp-1 font-medium">{listing.title}</p>
          <p className="mt-0.5">
            ${listing.price_day} <span className="text-sm">/day</span>{" "}
          </p>
        </div>
      </Link>

      <footer className="flex mt-5 gap-4">
        <CtaButton
          text="Delete"
          className="border border-transparent bg-transparent text-text hover:border-primary-300 py-2 w-1/2"
          onClick={() => setIsDeletePopUp(true)}
        />
        <Link href={`/listing/${listing.id}/edit`} className="w-1/2">
          <CtaButton text="Edit" className="py-2 w-full bg-primary-200 hover:bg-primary-200/50 text-text transition-colors duration-100 ease-in" />
        </Link>
      </footer>

      {isDeletePopUp && (
        <DeletePopUp
          setIsDeletePopUp={setIsDeletePopUp}
          listingId={listing.id}
        />
      )}
    </article>
  );
};

const MylistingsGrid = ({ listings }: { listings: Listing[] }) => {
  return (
    <section className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-[15px] gap-y-[24px] mt-8 items-start">
      {listings.map((listing) => (
        <MyListingCard key={listing.id} listing={listing} />
      ))}
    </section>
  );
};

export default MylistingsGrid;
