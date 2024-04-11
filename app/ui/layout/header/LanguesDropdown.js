import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import classes from "./languesDropdown.module.css";

const LanguesDropdown = () => {
  return (
    <div className={classes["dropdown-lang"]}>
      English
      <MdOutlineKeyboardArrowDown />
      <div className={classes["lang-options"]}>
        <p className={classes["lang-option"]}>English</p>
        <p className={classes["lang-option"]}>العربية</p>
        <p className={classes["lang-option"]}>Español</p>
      </div>
    </div>
  );
};

export default LanguesDropdown;
