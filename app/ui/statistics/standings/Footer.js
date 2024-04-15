import React from "react";
import classes from './footer.module.css'
const Footer = () => {
  return (
    <div className={classes["standings-footer"]}>
      <div className={classes["leagues"]}>
        <div className={classes["league"]}>
          <span className={classes["champions-league"]}></span>

          <p className={classes["league-name"]}>Champions League</p>
        </div>
        <div className={classes["league"]}>
          <span className={classes["europa-league"]}></span>

          <p className={classes["league-name"]}>Europa League</p>
        </div>
        <div className={classes["league"]}>
          <span className={classes["conference-league"]}></span>

          <p className={classes["league-name"]}>Conference League</p>
        </div>
        <div className={classes["league"]}>
          <span className={classes["relegation"]}></span>

          <p className={classes["league-name"]}>Relegation</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
