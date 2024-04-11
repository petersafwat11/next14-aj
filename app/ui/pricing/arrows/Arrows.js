import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import classes from "./arrows.module.css";
export const NextArrow = ({ onClick }) => {
  return (
    <div className={classes["next-wrapper"]} onClick={onClick}>
      <MdOutlineKeyboardArrowRight className={classes["arrow"]} />
    </div>
  );
};
export const PrevArrow = ({ onClick }) => {
  return (
    <div className={classes["prev-wrapper"]} onClick={onClick}>
      <MdOutlineKeyboardArrowLeft className={classes["arrow"]} />
    </div>
  );
};
