import ListingInfo from "@/components/ListingInfo";
import { fetchListingByIdAction } from "@/lib/action";
import Calendar from "@/components/Calendar";
import React from "react";

const ListingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const listing = await fetchListingByIdAction(id);
  
  return (
    <main className="px-20 max-lg:px-10 max-sm:px-5">
      <section className="flex mt-14 max-md:mt-22 gap-30 max-xl:gap-[60px] max-lg:gap-[30px] max-lg:flex-col justify-between">
        <ListingInfo listing={listing} />
        <Calendar listing={listing} />
      </section>
    </main>
  );
};

export default ListingPage;
