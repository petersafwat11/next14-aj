"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
  customAPi,
}) => {
  const [category, setCategory] = useState("LINEUPS");
  const [statisticsData, setStatisticsData] = useState([
    {
      name: "TOTAL POINTS",
      home: 0,
      away: 0,
    },
    {
      name: "ACES",
      home: 0,
      away: 0,
    },
    {
      name: "DOUBLE FAULTS",
      home: 0,
      away: 0,
    },
    {
      name: "BREAK POINTS SAVED",
      home: "0/0 (0%)",
      away: "40/0 (0%)",
    },
    // {
    //   name: "OFFENSIVE REBOUNDS",
    //   home: 0,
    //   away: 0,
    // },
    {
      name: "SERVICE POINTS WON",
      home: 0,
      away: 0,
    },
    {
      name: "RECEIVER POINTS WON",
      home: 0,
      away: 0,
    },
  ]);
  const changeCategory = (category) => {
    setCategory(category);
  };
  useEffect(() => {
    if (sportCategory && matchId) {
      (async () => {
        try {
          const statistics = await axios.get(
            `${process.env.BACKEND_SERVER}/sports/eventAPIData/statistics`,
            {
              params: {
                matchId,
                sportCategory,
                eventDate,
                dataType: "Statistics",
              },
            }
          );
          const allStats = statistics?.data?.data?.find(
            (stat) => stat.period === "ALL"
          ).groups;

          const useableData = [
            {
              name: "TOTAL POINTS",
              home: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find((items) => items.name === "Total")
                ?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find((items) => items.name === "Total")
                ?.away,
            },
            {
              name: "ACES",
              home: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find((items) => items.name === "Aces")?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find((items) => items.name === "Aces")?.away,
            },
            {
              name: "DOUBLE FAULTS",
              home: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find(
                  (items) => items.name === "Double faults"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find(
                  (items) => items.name === "Double faults"
                )?.away,
            },
            {
              name: "BREAK POINTS SAVED",
              home: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find(
                  (items) => items.name === "Break points saved"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Service")
                ?.statisticsItems?.find(
                  (items) => items.name === "Break points saved"
                )?.away,
            },
            // {
            //   name: "OFFENSIVE REBOUNDS",
            //   home: allStats
            //     ?.find((stat) => stat.groupName === "Points")
            //     ?.statisticsItems?.find((items) => items.name === "Total")
            //     ?.home,
            //   away: allStats
            //     ?.find((stat) => stat.groupName === "Points")
            //     ?.statisticsItems?.find((items) => items.name === "Total")
            //     ?.away,
            // },
            {
              name: "SERVICE POINTS WON",
              home: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service points won"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service points won"
                )?.away,
            },
            {
              name: "RECEIVER POINTS WON",
              home: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find(
                  (items) => items.name === "Receiver points won"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Points")
                ?.statisticsItems?.find(
                  (items) => items.name === "Receiver points won"
                )?.away,
            },
          ];
          console.log("useable", useableData);
          setStatisticsData(useableData);
        } catch (err) {
          console.log("error", err);
        }
      })();
    }
  }, [matchId, sportCategory, eventDate]);
  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["LINEUPS", "STATISTICS"]}
      />
      {category === "LINEUPS" ? (
        <Lineups data={customAPi} />
      ) : (
        <Statistics
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
          optionsOne={[
            "TOTAL POINTS",
            "ACES",
            "DOUBLE FAULTS",
            "BREAK POINTS SAVED",
            "OFFENSIVE REBOUNDS",
            "SERVICE POINTS WON",
            "RECEIVER POINTS WON",
          ]}
          data={statisticsData}
          // optionsTwo={["SERVICE POINTS WON", "RECEIVER POINTS WON"]}
        />
      )}
    </div>
  );
};

export default MatchSummery;
