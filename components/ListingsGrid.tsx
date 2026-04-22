"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardLoader from "./skeletonLoaders/cardLoader/CardLoader";
import { useRef } from "react";
import {
  fetchHomeListingsAction,
  fetchTotalNumberOfHomeListingsAction,
} from "@/lib/action";

const PAGE_SIZE = 10;

const ListingsGrid = ({
  initialListings,
  total,
}: {
  initialListings: Listing[];
  total: number;
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const isFirstRender = useRef(true);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moreListingsLoading, setMoreListingsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(listings.length !== total);

  const handleShowMore = async () => {
    try {
      setMoreListingsLoading(true);
      const nextPage = page + 1;
      const newListings = await fetchHomeListingsAction(nextPage, PAGE_SIZE);
      setListings((prev) => {
        const updated = [...prev, ...newListings];
        setHasMore(updated.length !== total);
        return updated;
      });
      setPage(nextPage);
    } catch (error) {
      console.error(`Error showing more listings ${error}`);
    } finally {
      setMoreListingsLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const loadCategory = async () => {
      setLoading(true);
      try {
        const [newListings, newTotal] = await Promise.all([
          fetchHomeListingsAction(0, PAGE_SIZE, category),
          fetchTotalNumberOfHomeListingsAction(category),
        ]);
        setListings(newListings);
        setPage(0);
        setHasMore(newListings.length !== newTotal);
      } catch (error) {
        console.error(`Error fetching listings based on category ${error}`);
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [category]);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  if (loading) {
    return (
      <ul className="grid grid-cols-5 gap-x-3.75 gap-y-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardLoader key={i} />
        ))}
      </ul>
    );
  }

  return (
    <section className="mt-8">
      <ul className="grid grid-cols-5 gap-x-3.75 gap-y-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {listings.map((item) => (
          <li key={item.id}>
            <Link href={`/listing/${item.id}`}>
              <article className="rounded-md overflow-hidden bg-primary-100 px-1 pt-1 pb-2 hover:shadow-sm hover:shadow-primary-200 transition-transform duration-150 ease-in hover:-translate-y-0.5">
                <div className="h-61 max-xl:h-55 max-lg:h-52.5 max-sm:h-75 overflow-hidden rounded-md">
                  <Image
                    height={244}
                    width={244}
                    src={item.pictures[0]}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-2 space-y-0.5 px-1">
                  <p className="font-medium">
                    ${item.price_day}
                    <span className="text-sm">/day</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="leading-snug line-clamp-1 text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
        {moreListingsLoading &&
          Array.from({ length: 5 }).map((_, i) => <CardLoader key={i} />)}
      </ul>

      {hasMore && (
        <button
          onClick={handleShowMore}
          className="mx-auto block mt-15 cursor-pointer bg-primary-100 rounded-md px-3.75 py-2.5 shadow-primary-200 text-sm font-medium hover:shadow-sm transition-shadow duration-150 ease-in"
          disabled={loading}
        >
          {loading ? "Loading..." : "Show more"}
        </button>
      )}
    </section>
  );
};

export default ListingsGrid;
