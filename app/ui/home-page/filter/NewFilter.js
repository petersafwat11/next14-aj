import React, { useState } from "react";
import classes from "./newFilter.module.css";
import Image from "next/image";
import Popup from "@/components/popupWrapper/Popup";
const NewFilter = ({ options, handleFilter, filterValue, channels }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className={classes["container"]}>
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
                    item.toLowerCase() === filterValue.toLowerCase()
                      ? classes["selected-option"]
                      : classes["option"]
                  }
                >
                  {item}
                </p>
              ))}
            </div>
            <span className={classes['bottom']}> </span>
          </div>
        </Popup>
      )}
      <div
        onClick={() => {
          setShowOptions(!showOptions);
        }}
        className={classes["selected"]}
      >
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
