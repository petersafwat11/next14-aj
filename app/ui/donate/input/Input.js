import React from "react";
import classes from "./input.module.css";
const Input = () => {
  return (
    <div className={classes["input-wrapper"]}>
      <span className={classes['currency-sign']}>$</span>
      <input className={classes["input"]} type="text" />
      <span className={classes["currency"]}>USD</span>
    </div>
  );
};

export default Input;
