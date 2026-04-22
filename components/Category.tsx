"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const seedCategories = [
  "All categories",
  "Drones",
  "Car equipment",
  "Memory cards",
  "Garden machinery",
  "Party lights",
  "Tablets",
  "Guitar",
  "Laptops",
];

const Category = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all categories";

  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all categories") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const allCategories = ["all categories", ...categories];

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };
  return (
    <nav className="relative max-xl: px-[24px]">
      <ul
        className="max-w-[1211px] flex items-center justify-between mx-auto mt-[112px] overflow-x-auto gap-[24px] scrollbar-hide"
        ref={scrollRef}
      >
        {canScrollLeft && (
          <button
            className="cursor-pointer absolute top-[2px] left-0 bg-bg-main z-10  rounded-md p-0.5"
            onClick={() => scroll("left")}
            aria-label="Scroll categories left"
          >
            <ChevronLeft strokeWidth={2} size={20} />
          </button>
        )}

        {allCategories.map((catx) => (
          <li key={catx}>
            <button
              className={cn(
                `cursor-pointer font-medium hover:opacity-75 transition-opacity duration-150 border border-primary-100 rounded-md px-[8px] py-[3px] text-sm whitespace-nowrap`,
                activeCategory === catx && "bg-primary-100",
              )}
              onClick={() => handleCategoryClick(catx)}
            >
              {catx.charAt(0).toUpperCase() + catx.slice(1)}
            </button>
          </li>
        ))}

        {canScrollRight && (
          <button
            className="cursor-pointer absolute top-[2px] right-0 bg-bg-main z-10 rounded-md p-0.5"
            onClick={() => scroll("right")}
            aria-label="Scroll categories right"
          >
            <ChevronRight strokeWidth={2} size={20} />
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Category;
