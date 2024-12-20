import React from "react";
import Details from "../details/Details";
import Staduim from "./Staduim";
import classes from "./lineups.module.css";
const Lineups = ({data}) => {
  return (
    <div className={classes["container"]}>
      <Staduim  data={data}/>
      {/* <Details
        matchDetails={[
          { left: "VENUE", right: "O2 Arena" },
          { left: "LOCATION", right: "New Delhi, India" },
        ]}
      /> */}
    </div>
  );
};

export default Lineups;
