"use client";

import React, { useState } from "react";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Formation from "./Formation";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
}) => {
  const [category, setCategory] = useState("CIRUIT");
  const changeCategory = (category) => {
    setCategory(category);
  };

  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["CIRUIT", "FORMATION"]}
      />
      {category === "CIRUIT" ? <Lineups /> : <Formation />}
    </div>
  );
};

export default MatchSummery;
