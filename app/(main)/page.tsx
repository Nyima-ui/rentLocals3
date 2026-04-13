import Category from "@/components/Category";
import Footer from "@/components/Footer";
import ListingsGrid from "@/components/ListingsGrid";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <main className="px-[80px] max-lg:px-[40px] max-sm:px-[20px]">
      <section
        className="h-[184px] mt-[40px] bg-[url('/hero-bg.png')] flex justify-center items-end bg-cover bg-center"
        aria-label="hero"
      >
        <h1 className="text-[47px] font-syne max-sm:text-[33px] max-lg:leading-tight text-center font-medium">
          Your neighbors have what you need.
        </h1>
      </section>

      <SearchBox />
      <Category />
      <ListingsGrid />
      <Footer />
    </main>
  );
}
