import React from "react";
import { clearFilters, setSearch, setTags } from "~/store/filtersSlice";
import type { RootState } from "~/store/store";
import { useDispatch, useSelector } from "react-redux";

interface FilterBarProps {
  allTags: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ allTags }) => {
  const dispatch = useDispatch();
  const { search, tags } = useSelector((state: RootState) => state.filters);

  return (
    <div className="w-full flex flex-col gap-2 p-4 bg-white/80 dark:bg-neutral-900/80 shadow-lg rounded-b-xl sticky top-0 z-20">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white dark:bg-neutral-800"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        {search || tags.length ? (
          <button
            className="ml-2 px-3 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            onClick={() => dispatch(clearFilters())}
            aria-label="Clear filters"
          >
            ✕
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition select-none ${
              tags.includes(tag)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-400"
            }`}
            onClick={() => {
              if (tags.includes(tag)) {
                dispatch(setTags(tags.filter((t) => t !== tag)));
              } else {
                dispatch(setTags([...tags, tag]));
              }
            }}
            aria-pressed={tags.includes(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
