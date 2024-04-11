import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdArrowDropup } from "react-icons/io";
import classes from "./sorting.module.css";
const Sorting = ({ options, handleSorting, sorting }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["selected"]}>
        <AiOutlineCheck className={classes["check"]} />
        <p className={classes["selected-item"]}>{sorting}</p>
        <IoMdArrowDropup className={classes["arrow"]} />
      </div>
      <div className={classes["other-items"]}>
        {options.map((item, index) => (
          <p
            onClick={() => {
              handleSorting(item);
            }}
            key={index}
            className={
              item.toLowerCase() === sorting.toLowerCase()
                ? classes["item-list-selected"]
                : classes["item"]
            }
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sorting;
