"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import classes from "./mobileSearch.module.css";
const MobileSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((val) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className={classes["search-mobile"]}>
      <input
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className={classes["search-mobile-input"]}
        type="text"
        placeholder="Enter keyword..."
      />
      <button className={classes["search-mobile-button"]}>SEARCH</button>
    </div>
  );
};

export default MobileSearch;
