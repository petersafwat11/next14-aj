import React from "react";
import Match from "../match/Match";
import classes from "./matches.module.css";
const HotMatches = ({ data }) => {
  return (
    <div className={classes["matches"]}>
      {data &&
        data?.length > 0 &&
        data?.map((matchData, index) => (
          <Match
            type={"hot-matches"}
            matchData={matchData}
            key={matchData?._id}
            index={index}
            length={data?.length}
          />
        ))}
    </div>
  );
};

export default HotMatches;
