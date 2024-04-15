import React from "react";
import classes from "./Knockout.module.css";
import Body from "./body/Body";
import Header from "./header/Header";
const Knockout = () => {
  return (
    <div className={classes["container"]}>
      <Header />
      <span className={classes["border-curved"]}></span>
      <Body />
    </div>
  );
};

export default Knockout;
