import React from "react";
import classes from "./top.module.css";
const Top = ({ firstTeamName, secondTeamName }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["team-first"]}>{firstTeamName}</div>
      <div className={classes["middle"]}>MATCH EVENTS</div>
      <div className={classes["team-sec"]}>{secondTeamName}</div>
    </div>
  );
};

export default Top;
