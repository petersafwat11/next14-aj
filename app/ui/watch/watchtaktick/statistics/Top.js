import React from "react";
import classes from "./top.module.css";
const Top = ({ firstTeamName, secondTeamName }) => {
  return (
    <div className={classes["contianer"]}>
      <div className={classes["team-first"]}>
        <span></span>
        <p className={classes["team-first-name"]}>{firstTeamName}</p>
      </div>
      <p className={classes["middle"]}>Name</p>
      <div className={classes["team-sec"]}>
        <span></span>
        <p className={classes["team-first-name"]}>{secondTeamName}</p>
      </div>
    </div>
  );
};

export default Top;
