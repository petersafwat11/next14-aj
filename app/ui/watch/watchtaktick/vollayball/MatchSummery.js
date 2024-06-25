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
      name: "POINTS WON",
      home: 0,
      away: 0,
    },
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
    {
      name: "ACES",
      home: 0,
      away: 0,
    },
    {
      name: "TIMEOUTS",
      home: 0,
      away: 0,
    },
    {
      name: "Max points in a row",
      home: 0,
      away: 0,
    },
    {
      name: "Service errors",
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
          // console.log("stats", allStats);
          const useableData = [
            {
              name: "POINTS WON",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Points won")
                ?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Points won")
                ?.away,
            },
            {
              name: "SERVICE POINTS WON",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service points won"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service points won"
                )?.away,
            },
            {
              name: "RECEIVER POINTS WON",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Receiver points won"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Receiver points won"
                )?.away,
            },
            {
              name: "ACES",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Aces")?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Aces")?.away,
            },
            {
              name: "Max points in a row",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Max points in a row"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Max points in a row"
                )?.away,
            },
            {
              name: "Service errors",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service errors"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Service errors"
                )?.away,
            },
          ];
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
          data={statisticsData}
        />
      )}
    </div>
  );
};

export default MatchSummery;
