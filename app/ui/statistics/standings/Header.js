import React from "react";
import classes from "./header.module.css";
const Header = ({ first, second, mobileSecond }) => {
  return (
    <div className={classes["standings-header"]}>
      <div className={classes["standings-header-first"]}>
        {first.map((i, index) => (
          <p key={index} className={classes["standings-header-para"]}>
            {i}
          </p>
        ))}
      </div>
      <div className={classes["standings-header-second"]}>
        {second.map((i, index) => (
          <p key={index} className={classes["standings-header-para"]}>
            {i}
          </p>
        ))}
      </div>
      <div className={classes["standings-header-second-mobile"]}>
        {mobileSecond.map((i, index) => (
          <p key={index} className={classes["standings-header-para"]}>
            {i}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Header;
