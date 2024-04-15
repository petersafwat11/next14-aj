"use client";
import Image from "next/image";
import React from "react";
import classes from "./search.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import action from "@/app/lib/action";

const Search = () => {
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
    action("channels");
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className={classes["search-wrapper"]}>
      <div className={classes["search-div"]}>
        <input
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className={classes["channel-search"]}
          type="text"
          placeholder="Search for channel..."
        />
        <Image
          className={classes["search-icon"]}
          src="/svg/search-icon.svg"
          alt="search"
          width="9"
          height="9"
        />
      </div>
    </div>
  );
};

export default Search;
