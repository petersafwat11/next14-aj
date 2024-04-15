import React from "react";
import Details from "../details/Details";
import Temprature from "../temprature/Temprature";
import Staduim from "./Staduim";
import classes from "./lineups.module.css";
const Lineups = () => {
  return (
    <div className={classes["container"]}>
      <Staduim />
    </div>
  );
};

export default Lineups;
