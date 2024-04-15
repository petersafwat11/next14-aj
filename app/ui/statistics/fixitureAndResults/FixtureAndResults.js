"use client";
import React from "react";
import classes from "./fixtureAndResults.module.css";
import Matches from "./matches/Matches";
import Top from "./top/Top";
const FixtureAndResults = ({ type, data }) => {
  const convertToCustomFormat = (dateString) => {
    const date = new Date(dateString);

    const options = { day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  return (
    <div className={classes["fixure"]}>
      {data.map((groupData, index) => (
        <div key={index}>
          <div className={classes["dates"]}>
            <Top date={convertToCustomFormat(groupData[0].adjustedDateKey)} />
            <Matches groupData={groupData} type={type} />
          </div>
          {index + 1 !== data.length && (
            <span className={classes["devider"]}></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FixtureAndResults;
