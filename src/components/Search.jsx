"use client";

import { LucideSearch } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Search = ({ className }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search-users?query=${query}`);
        const data = await res.json();
        setResults(data.slice(0, 3));
        console.log(results);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const debounce = setTimeout(fetchUsers, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative">
      <div className="bg-dark-700 flex w-full items-center rounded-4xl px-4 py-2">
        <LucideSearch className="text-dark-500 mr-4 h-5 w-5" />
        <input
          className="placeholder:text-dark-500 flex flex-1 text-black focus:outline-none"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-12 left-0 w-full rounded-4xl bg-white px-5 py-5 shadow-lg">
          {results.map((user) => (
            <Link
              href={`/profile/${user._id}`}
              key={user._id}
              className="hover:bg-dark-700 flex items-center rounded-4xl px-4 py-2"
              onClick={() => setQuery("")}
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="mr-2 h-8 w-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-black">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-500">@{user.username}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
