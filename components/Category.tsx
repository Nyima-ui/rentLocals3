"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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

const Category = () => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
      left: dir === "left" ? -200 : 200,
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

        {seedCategories.map((catx) => (
          <li key={catx}>
            <button className="cursor-pointer font-medium hover:opacity-75 transition-opacity duration-150 border border-primary-100 rounded-md px-[8px] py-[3px] text-sm whitespace-nowrap">
              {catx}
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
