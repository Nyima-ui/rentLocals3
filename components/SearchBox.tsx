"use client";
import { Search } from "lucide-react";

const SearchBox = () => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[628px] mt-[32px] rounded-md overflow-hidden shadow-search focus-within:outline-primary-300 focus-within:outline-2">
      <div className="flex items-center bg-primary-100">
        <div className="flex-1">
          <label htmlFor="search-query" className="sr-only">
            Search query
          </label>
          <input type="text" id="search-query" className="p-[12px] max-sm:p-[10px] w-full focus:outline-none" placeholder="Party lights" />
        </div>
        <button type="submit" className="cursor-pointer bg-primary h-full p-[12px]">
          <Search color="#fff5f0" strokeWidth={3}/>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
