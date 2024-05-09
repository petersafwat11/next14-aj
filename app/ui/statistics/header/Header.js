import React from "react";
import classes from "./header.module.css";

const Header = ({
  statisticsType,
  changeStatisticsType,
}) => {
  return (
    <div>
      <div className={classes["statistics-types"]}>
        <p
          style={{
            borderBottom:
              statisticsType === "fixtures"
                ? "2px solid #03a1cd"
                : "2px solid transparent",
            color: statisticsType === "fixtures" ? "#03a1cd" : "inherit",
          }}
          onClick={() => {
            changeStatisticsType("fixtures");
          }}
          className={classes["statistics-type"]}
        >
          FIXTURES
        </p>
        <p
          onClick={() => {
            changeStatisticsType("standings");
          }}
          className={classes["statistics-type"]}
          style={{
            borderBottom:
              statisticsType === "standings"
                ? "2px solid #03a1cd"
                : "2px solid transparent",
            color: statisticsType === "standings" ? "#03a1cd" : "inherit",
          }}
        >
          STANDINGS
        </p>

        <p
          onClick={() => {
            changeStatisticsType("results");
          }}
          style={{
            borderBottom:
              statisticsType === "results"
                ? "2px solid #03a1cd"
                : "2px solid transparent",
            color: statisticsType === "results" ? "#03a1cd" : "inherit",
          }}
          className={classes["statistics-type"]}
        >
          RESULTS
        </p>
      </div>
    </div>
  );
};

export default Header;
