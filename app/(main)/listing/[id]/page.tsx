import ListingInfo from "@/components/ListingInfo";
import { fetchListingByIdAction } from "@/lib/action";
import Calendar from "@/components/Calendar";
import React from "react";

const ListingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const listing = await fetchListingByIdAction(id);

  return (
    <main className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <section className="flex justify-between mt-[56px] gap-[120px]">
        <ListingInfo listing={listing} />
        <Calendar listing={listing} />
      </section>
    </main>
  );
};

export default ListingPage;
