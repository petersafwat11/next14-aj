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
}) => {
  const [category, setCategory] = useState("STATISTICS");
  const [statisticsData, setStatisticsData] = useState(null);
  const [lineupsData, setLineupsData] = useState("");

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
              },
            }
          );
          const allStats = statistics?.data?.find(
            (stat) => stat.period === "ALL"
          ).groups;
          console.log("stats", allStats);
          const useableData = [
            {
              name: "THROWN 180",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Thrown 180")
                ?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Thrown 180")
                ?.away,
            },
            {
              name: "THROWN OVER 140",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Thrown over 140"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Thrown over 140"
                )?.away,
            },
            {
              name: "THROWN OVER 100",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Thrown over 100"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Thrown over 100"
                )?.away,
            },
            {
              name: "HIGHEST CHECKOUT",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Highest checkout"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Highest checkout"
                )?.away,
            },
            {
              name: "CHECKOUTS ACCURACY",
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Checkouts accuracy"
                )?.home,
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Checkouts accuracy"
                )?.away,
            },
          ];
          setStatisticsData(useableData);
          console.log("useable", useableData);
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
        categories={[
          // "LINEUPS",
          "STATISTICS",
        ]}
      />
      {category === "LINEUPS" ? (
        <Lineups />
      ) : (
        <Statistics
          data={statisticsData}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
        />
      )}
    </div>
  );
};

export default MatchSummery;
