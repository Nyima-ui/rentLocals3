import ListingInfo from "@/components/ListingInfo";
import { fetchListingByIdAction } from "@/lib/action";
import Calendar from "@/components/Calendar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

const ListingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let listing;

  try {
    listing = await fetchListingByIdAction(id);
  } catch (error) {
    notFound();
  }

  return (
    <main className="px-20 max-lg:px-10 max-sm:px-5">
      <section className="flex mt-14 max-md:mt-22 gap-30 max-xl:gap-[60px] max-lg:gap-[30px] max-lg:flex-col justify-between">
        <ListingInfo listing={listing} />
        <Calendar listing={listing} />
      </section>
      <Footer />
    </main>
  );
};

export default ListingPage;
