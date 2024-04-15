import React from "react";
import Details from "../details/Details";
import Temprature from "../temprature/Temprature";
import classes from "./lineups.module.css";
import Staduim from "./Staduim";
const Lineups = ({ data, secondTeamName, firstTeamName }) => {
  return (
    <div className={classes["container"]}>
      <Staduim data={data}/>
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
