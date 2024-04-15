import React from "react";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import classes from "./standingsGroup.module.css";

const StandingsGroup = ({ groupData }) => {
  return (
    <div className={classes["container"]}>
      <h3 className={classes["title"]}>{groupData[0].group}</h3>
      <Header
        first={["#", "Team"]}
        second={["PL", "W", "D", "L", "GF", "GA", "PTS"]}
        mobileSecond={["P", "W", "D", "L", "PTS"]}
      />
      <Body groupData={groupData} />
      <span className={classes["devider"]}></span>
      <Footer />
    </div>
  );
};

export default StandingsGroup;
