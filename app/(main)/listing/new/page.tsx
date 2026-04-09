import PostListingForm from "@/components/PostListingForm";
import React from "react";

const page = () => {
  return (
    <section className=" flex items-center flex-col">
      <div className="mt-[48px]">
        <h1 className="text-[23px] font-medium">Post your listing</h1>
        <PostListingForm />
      </div>
    </section>
  );
};

export default page;
