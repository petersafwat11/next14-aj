"use client";

import React, { useState } from "react";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
const MatchSummery = ({ customAPi }) => {
  const [category, setCategory] = useState("LINEUPS");
  const changeCategory = (category) => {
    setCategory(category);
  };
  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["LINEUPS"]}
      />
      <Lineups data={customAPi} />
    </div>
  );
};

export default MatchSummery;
