import React from "react";
import { useEffect, useState } from "react";
import { parseISO, formatDistanceToNow, format } from "date-fns";

const useSearchPost = ({ posts, setResults }) => {
  const timeAgo = (timestamp) => {
    let data = "";
    let date = parseISO(timestamp);

    // Format the date to display the month and year
    data = format(date, "MMMM yyyy");

    return data;
  };

  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  const performSearch = (query) => {
    // Convert the query to lowercase for a case-insensitive search
    const lowercaseQuery = query.toLowerCase().trim(); // Trim the query to remove leading and trailing spaces

    // Use Array.filter to find matching items
    const matchingItems = posts.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(lowercaseQuery) !== -1 ||
        item.agency.toLowerCase().indexOf(lowercaseQuery) !== -1 ||
        timeAgo(item.dateCreated).toLowerCase().indexOf(lowercaseQuery) !== -1
      );
    });

    setResults(matchingItems);
  };

  return (
    <>
      <div
        class="fixed z-50 flex flex-col  shadow-md   rounded
                 right-3   shadow-sm top-[53px] cursor-pointer   "
      >
        {" "}
        <form>
          <label
            forhtml="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={query}
              onChange={handleInputChange}
              placeholder="Search posts..."
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default useSearchPost;
