import React from "react";
import Body from "./body/Body";
import Header from "./header/Header";
import classes from "./knockoutStandings.module.css";
const KnockoutStandings = () => {
  return (
    <div className={classes["contaianer"]}>
      <Header />
      <Body />
    </div>
  );
};

export default KnockoutStandings;
