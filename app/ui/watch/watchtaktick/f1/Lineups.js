import React from "react";
import Details from "../details/Details";
import Temprature from "../temprature/Temprature";
import Staduim from "./Staduim";
import classes from "./lineups.module.css";
const Lineups = ({data}) => {
  return (
    <div className={classes["container"]}>
      <p className={classes['title']}>ABU DHABI INTERNATIONAL CIRCUIT</p>
      <Staduim />
      <div className={classes["temp"]}>
        <Temprature />
      </div>

      <Details
        matchDetails={[
          { left: "VENUE", right: "O2 Arena" },
          { left: "LOCATION", right: "New Delhi, India" },
          { left: "TEAM", right: "Pakistan" },
        ]}
      />
    </div>
  );
};

export default Lineups;
