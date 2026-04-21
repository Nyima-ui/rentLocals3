import Category from "@/components/Category";
import Footer from "@/components/Footer";
import ListingsGrid from "@/components/ListingsGrid";
import SearchBox from "@/components/SearchBox";
import { Suspense } from "react";
import {
  fetchCategoriesAction,
  fetchHomeListingsAction,
  fetchTotalNumberOfHomeListingsAction,
} from "@/lib/action";

export default async function Home() {
  const initialListings = await fetchHomeListingsAction(0, 10);
  const totalListings = await fetchTotalNumberOfHomeListingsAction();
  const categories = await fetchCategoriesAction();

  return (
    <main className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <section
        className="h-[184px] mt-[40px] bg-[url('/hero-bg.png')] flex justify-center items-end bg-cover bg-center max-md:mt-[98px]"
        aria-label="hero"
      >
        <h1 className="text-[47px] font-syne max-sm:text-[33px] max-lg:leading-tight text-center font-medium">
          Your neighbors have what you need.
        </h1>
      </section>

      <SearchBox />
      <Suspense>
        <Category categories={categories} />
        <ListingsGrid initialListings={initialListings} total={totalListings} />
      </Suspense>
      <Footer />
    </main>
  );
}
