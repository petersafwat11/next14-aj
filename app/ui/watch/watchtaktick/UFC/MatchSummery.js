"use client";
import React, { useState } from "react";
import GlobalHeader from "../globalHeader/GlobalHeader";
import FightersData from "./FightersData";
import MainEvent from "./MainEvent";
import classes from "./matchSummery.module.css";
const MatchSummery = ({ customAPi }) => {
  const [category, setCategory] = useState("MAIN EVENT");
  const changeCategory = (category) => {
    setCategory(category);
  };
  let headerItems = [];
  if (customAPi.mainEvent.checked === true) {
    headerItems.push("MAIN EVENT");
  }
  if (customAPi.booxingfighters.checked === true) {
    headerItems.push("FIGHTERS");
  }

  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["MAIN EVENT", "FIGHTERS"]}
      />
      <div className={classes["content"]}>
        {category === "MAIN EVENT" && customAPi.mainEvent.checked === true ? (
          <MainEvent data={customAPi?.mainEvent} />
        ) : customAPi?.booxingfighters?.checked === true ? (
          <FightersData data={customAPi?.booxingfighters} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MatchSummery;
