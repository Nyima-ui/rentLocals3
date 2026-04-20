"use client";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const POPULAR_SEARCHES = [
  "Party lights",
  "Garden machinery",
  "Camera equipment",
  "Guitar",
  "Pressure washer",
];

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResults[]>([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }

    const searchListings = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("listings")
        .select("id, title, category, price_day")
        .or(
          `title.ilike.%${debouncedQuery}%,category.ilike.%${debouncedQuery}%`,
        )
        .limit(6);

      if (error) {
        console.error(`Error fetching search results, ${error}`);
      }
      setResults(data ?? []);
    };

    searchListings();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isInputFocused) {
        setIsMobileSearchOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInputFocused]);

  useEffect(() => {
    if (isMobileSearchOpen) {
      mobileInputRef.current?.focus();
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileSearchOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // const handleSearch = (title: string, id: string) => {
  //   setQuery(title);
  //   router.push(`/listing/${id}`);
  // };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto max-w-157 mt-8 rounded-md shadow-search focus-within:outline-primary-300 focus-within:outline-2 relative z-10"
      >
        <div className="flex items-center bg-primary-100 hover:bg-primary-100/70">
          <div className="flex-1">
            <label htmlFor="search-query" className="sr-only">
              Search query
            </label>
            <input
              type="text"
              id="search-query"
              className="p-3 max-sm:p-2.5 w-full focus:outline-none"
              placeholder="Eg. Party lights"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setShowSuggestion(true);
                setIsInputFocused(true);
                if (window.innerWidth < 768) {
                  setIsMobileSearchOpen(true);
                }
              }}
              autoComplete="off"
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-primary h-full p-3 rounded-tr-md rounded-br-md hover:opacity-90 transition-opacity duration-100 ease-in"
          >
            <Search color="#fff5f0" strokeWidth={3} />
          </button>
        </div>

        {showSuggestion && results.length > 0 && (
          <div className="absolute top-full left-0 text-text bg-primary-100 w-[calc(100%-48px)] shadow-sm shadow-primary-200 rounded-md translate-y-1.5">
            <p className="font-medium mt-4 pl-4">Top matches</p>
            <ul className="mt-2.5">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="pl-12 bg-transparent hover:bg-primary-200"
                  onClick={() => setQuery(result.title)}
                  tabIndex={-1}
                >
                  <Link href={`/listing/${result.id}`} className="py-2.5 block">
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
      {/* MOBILE SEARCH BOX  */}
      {isMobileSearchOpen && (
        <div className="fixed bg-bg-main top-0 right-0 z-40 w-full h-screen px-5 pt-12 hidden max-md:flex max-md:flex-col">
          <form className="relative focus-within:outline-2 focus-within:outline-primary rounded-md shadow-sm shadow-primary-200">
            <label htmlFor="mobile-search-query" className="sr-only">
              Search query for smaller devices
            </label>
            <input
              type="text"
              id="mobile-search-query"
              name="mobile-search-query"
              className="bg-primary-100 rounded-md w-full p-3 focus:outline-none"
              placeholder="What do you need to rent"
              ref={mobileInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              className="absolute top-2 right-1 p-1 cursor-pointer hover:bg-primary-200 rounded-md"
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X />
            </button>
          </form>

          {query ? (
            results.length > 0 && (
              <div
                className="bg-primary-100 mt-2 rounded-md p-3 shadow-sm shadow-primary-200"
                role="dialog"
                aria-modal="true"
                aria-label="Search"
              >
                <p className="font-medium text-[19px]">Top matches</p>
                <ul className="mt-5">
                  {results.map((result) => (
                    <li
                      key={result.id}
                      className="rounded-[2.5px] flex items-center justify-between hover:bg-primary-200"
                      onClick={() => {
                        setQuery(result.title);
                        setIsMobileSearchOpen(false);
                      }}
                    >
                      <Link
                        href={`/listing/${result.id}`}
                        className="py-3 pl-5 block rounded-md w-full text-lg whitespace-nowrap line-clamp-1"
                      >
                        {result.title}
                      </Link>
                      <span>
                        <ChevronRight size={22} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ) : (
            <div
              className="bg-primary-100 mt-2 rounded-md p-3 shadow-sm shadow-primary-200"
              role="dialog"
              aria-modal="true"
              aria-label="Search"
            >
              <p className="font-medium text-[19px]">Popular searches</p>
              <ul className="mt-5">
                {POPULAR_SEARCHES.map((search) => (
                  <li
                    key={search}
                    className="rounded-[2.5px] flex items-center justify-between hover:bg-primary-200"
                  >
                    <Link
                      href="/"
                      className="py-3 pl-5 block rounded-md w-full text-lg whitespace-nowrap line-clamp-1"
                    >
                      {search}
                    </Link>
                    <span>
                      <ChevronRight size={22} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBox;
