import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedLanguage } from "@/features/projects/store/project-ui-slice";
import type { RootState } from "@/stores/store";

interface FiltersPanelProps {
  allLanguages: string[];
  allTags: string[];
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ allLanguages, allTags }) => {
  const dispatch = useDispatch();
  const { filtersOpen, selectedLanguage } = useSelector((state: RootState) => state.projectUi);
  const { tags } = useSelector((state: RootState) => state.filters);

  return (
    <div className="relative inline-block">
      {/* Filters Bar: absolutely positioned below the button (button removed, handled in ProjectsSection) */}
      <div
        className={`absolute left-1/2 z-30 w-[90vw] max-w-2xl -translate-x-1/2 flex flex-col items-center transition-all duration-500 ${filtersOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}`}
        style={{ transformOrigin: "top center", top: "calc(100% + 8px)" }}
      >
        <div className="w-full bg-zinc-950/90 rounded-2xl shadow-2xl border border-zinc-800 p-4 backdrop-blur-lg flex flex-col gap-4">
          {/* Language Dropdown */}
          <div className="relative w-full mb-2">
            <label className="block text-zinc-200 font-semibold mb-1">Programming Language</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg shadow-lg"
              value={selectedLanguage || ""}
              onChange={(e) => dispatch(setSelectedLanguage(e.target.value || null))}
            >
              <option value="">All Languages</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          {/* Tags Dropdown */}
          <div className="relative w-full mb-2">
            <label className="block text-zinc-200 font-semibold mb-1">Tags</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg shadow-lg"
              multiple
              value={tags}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                dispatch({ type: "filters/setTags", payload: selected });
              }}
              size={Math.min(6, allTags.length)}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <span className="block text-xs text-zinc-400 mt-1">Hold Ctrl (Cmd on Mac) to select multiple tags</span>
          </div>
        </div>
      </div>
    </div>
  );
};
