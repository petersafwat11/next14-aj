"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import classes from "./filter.module.css";
const Filter = ({ options, handleFilter, filterValue, channels }) => {
  const router = useRouter();
  return (
    <div className={classes["container"]}>
      <div className={classes["selected"]}>
        <p className={classes["selected-sport"]}>{filterValue}</p>
        <Image
          className={classes["langs-icon"]}
          src="/svg/channels/langs-icon.svg"
          alt="chat"
          width="15"
          height="13"
        />
      </div>
      <div className={classes["other-sports"]}>
        {options.map((item, index) => (
          <p
            onClick={() => {
              if (channels) {
                handleFilter(item);
              } else {
                filterValue !== item && item === "ALL OTHERS"
                  ? router.push(`/currentEvents/others`)
                  : filterValue !== item
                  ? router.push(`/currentEvents/${item.toLowerCase()}`)
                  : "";
              }
            }}
            key={index}
            className={
              item.toLowerCase() === filterValue.toLowerCase()
                ? classes["sport-list-selected"]
                : classes["sport"]
            }
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Filter;
