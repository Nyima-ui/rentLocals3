"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResults[]>([]);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[628px] mt-[32px] rounded-md shadow-search focus-within:outline-primary-300 focus-within:outline-2 relative z-10"
    >
      <div className="flex items-center bg-primary-100">
        <div className="flex-1">
          <label htmlFor="search-query" className="sr-only">
            Search query
          </label>
          <input
            type="text"
            id="search-query"
            className="p-[12px] max-sm:p-[10px] w-full focus:outline-none"
            placeholder="Party lights"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-primary h-full p-[12px] rounded-tr-md rounded-br-md"
        >
          <Search color="#fff5f0" strokeWidth={3} />
        </button>
      </div>

      {results && results.length > 0 && (
        <div className="absolute top-full left-0 text-text bg-primary-100 w-[calc(100%-48px)] shadow-search-suggestion-box rounded-md translate-y-1.5">
          <p className="font-medium mt-[16px] pl-[16px]">Top matches</p>
          <ul className="mt-[10px]">
            {results.map((result) => (
              <li
                key={result.id}
                className="pl-[48px] bg-transparent hover:bg-primary-200"
                onClick={() => setQuery(result.title)}
              >
                <Link href="/" className="py-[10px] block">
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
