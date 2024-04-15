import React from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./standings.module.css";
const Standings = ({ data }) => {
  return (
    <section className={classes["standings"]}>
      <Header
        first={["#", "Team"]}
        second={["P", "W", "D", "L", "GF", "GA", "Last 5", "PTS"]}
        mobileSecond={["P", "W", "D", "L", "PTS"]}
      />
      <span className={classes["devider"]}></span>
      <Body standingsData={data} />
      <span className={classes["devider-2"]}></span>
      <Footer />
    </section>
  );
};

export default Standings;
