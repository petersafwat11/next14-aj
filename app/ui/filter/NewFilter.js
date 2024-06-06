"use client";
import React, { useEffect, useState } from "react";
import classes from "./newFilter.module.css";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Popup from "../popupWrapper/Popup";
import action from "@/app/lib/action";

const NewFilter = ({ options, channels, filterValue }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val && val !== "All Languages") {
      params.set("filter", val);
    } else {
      params.delete("filter");
    }
    action("channels");
    replace(`${pathname}?${params.toString()}`);
  };

  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowOptions(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Cleanup this component
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setShowOptions(!showOptions);
      }}
      className={classes["container"]}
    >
      {showOptions && (
        <Popup>
          <div className={classes["options-container"]}>
            <div className={classes["options"]}>
              {options.map((item, index) => (
                <p
                  onClick={() => {
                    if (channels) {
                      handleFilter(item);
                      setShowOptions(!showOptions);
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
                    item.toLowerCase() === filterValue?.toLowerCase()
                      ? classes["selected-option"]
                      : classes["option"]
                  }
                >
                  {item}
                </p>
              ))}
            </div>
            <span className={classes["bottom"]}> </span>
          </div>
        </Popup>
      )}
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
    </div>
  );
};

export default NewFilter;
