"use client";
import React, { useState } from "react";
import Details from "../details/Details";
import MatchDots from "../matchDots/MatchDots";
import Temprature from "../temprature/Temprature";
import Staduim from "./Staduim";
import classes from "./lineups.module.css";
const Lineups = ({data}) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };
  return (
    <div className={classes["container"]}>
      <Staduim data={data} />
      <MatchDots
        options={[1, 2, 3, 4]}
        selectedOption={option}
        changeOptions={changeCategory}
      />
      <div className={classes["temp"]}>
        <Temprature />
      </div>

      <Details
        matchDetails={[
          { left: "VENUE", right: "O2 Arena" },
          { left: "LOCATION", right: "New Delhi, India" },
        ]}
      />
    </div>
  );
};

export default Lineups;
