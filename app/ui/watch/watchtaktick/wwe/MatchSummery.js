"use client";

import React, { useState } from "react";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Fighters from "./Fighters";
import classes from "./matchSummery.module.css";
import Venue from "./Venue";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
  customAPi,
}) => {
  //wweFighters: {…}, featuredFighters
  const [category, setCategory] = useState("VENUE");
  const changeCategory = (category) => {
    setCategory(category);
  };

  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["VENUE", "FIGHTERS"]}
      />
      {category === "VENUE" ? (
        <Venue data={customAPi.wweFighters} />
      ) : (
        <Fighters data={customAPi.featuredFighters} />
      )}
    </div>
  );
};

export default MatchSummery;
