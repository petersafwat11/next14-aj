import React from "react";
import FixtureAndResults from "../fixitureAndResults/FixtureAndResults";
// import KnockoutStandings from "../standings/knockoutStandings/KnockoutStandings";
// import Knockout from "../standings/knockoutStandings/mobileVersion/Knockout";
import Standings from "../standings/Standings";
import ChampStandings from "../standings/championsStandings/ChampStandings";
import classes from "./header.module.css";

const Header = ({
  statisticsType,
  changeStatisticsType,
  standingsData,
  resultsData,
  fixturesData,
  standingsType,
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
      {statisticsType == "fixtures" ? (
        <FixtureAndResults data={fixturesData} type={"fixture"} />
      ) : statisticsType == "standings" ? (
        standingsType == "Leagues" ? (
          <Standings data={standingsData} />
        ) : (
          <ChampStandings data={standingsData} />
        )
      ) : (
        // <>
        //   <KnockoutStandings />
        //   <Knockout />
        // </>
        <FixtureAndResults data={resultsData} type={"result"} />
      )}
    </div>
  );
};

export default Header;
