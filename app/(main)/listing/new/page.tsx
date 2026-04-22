import PostListingForm from "@/components/PostListingForm";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="px-20 max-lg:px-10 max-sm:px-5">
      <section className="flex items-center flex-col">
        <div className="mt-12 max-md:mt-26.5 px-5">
          <h1 className="text-[23px] font-medium">Post your listing</h1>
          <PostListingForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
