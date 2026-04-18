import PostListingForm from "@/components/PostListingForm";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <section className="flex items-center flex-col">
        <div className="mt-[48px] max-md:mt-[106px] px-5">
          <h1 className="text-[23px] font-medium">Post your listing</h1>
          <PostListingForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
