import useDebounce from "@/hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";

interface SearchInputProps {
  searchHandler: (query: string) => void;
}

const SearchInput = ({ searchHandler }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  useEffect(() => {
    searchHandler(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchHandler]);

  return (
    <div className="relative w-full max-w-lg mb-6">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-4 pl-10 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35l4.35 4.35z"
        />
      </svg>
    </div>
  );
};

export default SearchInput;
