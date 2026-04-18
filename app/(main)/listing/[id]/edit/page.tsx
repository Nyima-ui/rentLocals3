import Footer from "@/components/Footer";
import EditListingForm from "@/components/EditListingFrom";
import { fetchListingByIdAction } from "@/lib/action";

const EditListingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const listing = await fetchListingByIdAction(id);
  return (
    <div className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <section className="flex items-center flex-col">
        <div className="mt-[48px] max-md:mt-[106px] px-5">
          <h1 className="text-[23px] font-medium">Update your listing</h1>
          <EditListingForm listing={listing}/>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditListingPage;
