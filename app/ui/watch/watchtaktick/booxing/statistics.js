"use client";
import React, { useState } from "react";
import GlobalHeader from "../globalHeader/GlobalHeader";
import FightersData from "./FightersData";
import MainEvent from "./MainEvent";
import classes from "./statistics.module.css";
const Statistics = () => {
  const [category, setCategory] = useState("MAIN EVENT");
  const changeCategory = (category) => {
    setCategory(category);
  };
  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["MAIN EVENT", "FIGHTERS"]}
      />
      <div className={classes["content"]}>
        {category === "MAIN EVENT" ? <MainEvent /> : <FightersData />}
      </div>
    </div>
  );
};

export default Statistics;
