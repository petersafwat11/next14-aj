import React from "react";
import classes from "./footer.module.css";
const Footer = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["item"]}>
        <span className={classes["Knockouts-span"]}></span>
        <p className={classes["para"]}>Knockouts</p>
      </div>
      <div className={classes["item"]}>
        <span className={classes["EuropaLeague-span"]}></span>
        <p className={classes["para"]}>Europa League</p>
      </div>
    </div>
  );
};

export default Footer;
