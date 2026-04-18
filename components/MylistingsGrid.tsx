import Image from "next/image";
import CtaButton from "./CtaButton";
import Link from "next/link";

export const MyListingCard = async ({ listing }: { listing: Listing }) => {
  return (
    <article className="bg-primary-100 rounded-md p-2">
      <Link href={`/listing/${listing.id}`}>
        <div className="overflow-hidden h-[234px] rounded-[2.5px] w-full">
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
          className="border border-primary-300 bg-transparent text-text hover:bg-primary-200 py-2"
        />
        <Link href={`/listing/${listing.id}/edit`}>
          <CtaButton text="Edit" className="py-2"/>
        </Link>
      </footer>
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
