"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import classes from "./matchSummery.module.css";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
}) => {
  const [category, setCategory] = useState("STATISTICS");
  const [statsData, setStatsData] = useState(null);
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
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Total yards")
                ?.home,
              name: "TOTAL YARDS",
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find((items) => items.name === "Total yards")
                ?.away,
            },
            // {
            //   home: allStats
            //     ?.find((stat) => stat.groupName === "Attacking")
            //     ?.statisticsItems?.find((items) => items.name === "Total yards")
            //     ?.home,
            //   name: "PASSING YARDS",
            //   away: allStats
            //     ?.find((stat) => stat.groupName === "Attacking")
            //     ?.statisticsItems?.find((items) => items.name === "Total yards")
            //     ?.away,
            // },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Rushing yards"
                )?.home,
              name: "RUSHING YARDS",
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Rushing yards"
                )?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Punting")
                ?.statisticsItems?.find(
                  (items) => items.name === "Average yards per punt"
                )?.home,
              name: "YARDS PER PLAY",
              away: allStats
                ?.find((stat) => stat.groupName === "Punting")
                ?.statisticsItems?.find(
                  (items) => items.name === "Average yards per punt"
                )?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Downs")
                ?.statisticsItems?.find((items) => items.name === "First downs")
                ?.home,
              name: "FIRST DOWNS",
              away: allStats
                ?.find((stat) => stat.groupName === "Downs")
                ?.statisticsItems?.find((items) => items.name === "First downs")
                ?.away,
            },

            {
              home: allStats
                ?.find((stat) => stat.groupName === "Downs")
                ?.statisticsItems?.find(
                  (items) => items.name === "Third down efficiency"
                )?.home,
              name: "3RD DOWN EFFICIENCY",
              away: allStats
                ?.find((stat) => stat.groupName === "Downs")
                ?.statisticsItems?.find(
                  (items) => items.name === "Third down efficiency"
                )?.away,
            },
            // {
            //   home: allStats
            //   ?.find((stat) => stat.groupName === "Attacking")
            //   ?.statisticsItems?.find((items) => items.name === "Rushing yards")
            //   ?.home,
            //   name: "TOTAL PLAYS",
            //   away: allStats
            //   ?.find((stat) => stat.groupName === "Attacking")
            //   ?.statisticsItems?.find((items) => items.name === "Rushing yards")
            //   ?.away,
            // },
            // {
            //   home: allStats
            //   ?.find((stat) => stat.groupName === "Attacking")
            //   ?.statisticsItems?.find((items) => items.name === "Rushing yards")
            //   ?.home,
            //   name: "SACKS ALLOWED",
            //   away: allStats
            //   ?.find((stat) => stat.groupName === "Attacking")
            //   ?.statisticsItems?.find((items) => items.name === "Rushing yards")
            //   ?.away,
            // },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Punting")
                ?.statisticsItems?.find((items) => items.name === "Punts")
                ?.home,
              name: "PUNTS",
              away: allStats
                ?.find((stat) => stat.groupName === "Punting")
                ?.statisticsItems?.find((items) => items.name === "Punts")
                ?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Penalty")
                ?.statisticsItems?.find((items) => items.name === "Penalties")
                ?.home,
              name: "PENALTIES",
              away: allStats
                ?.find((stat) => stat.groupName === "Penalty")
                ?.statisticsItems?.find((items) => items.name === "Penalties")
                ?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Rushing yards"
                )?.home,
              name: "FUMBLES LOST",
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Rushing yards"
                )?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Passing")
                ?.statisticsItems?.find(
                  (items) => items.name === "Interceptions thrown"
                )?.home,
              name: "INTERCEPTIONS THROWN",
              away: allStats
                ?.find((stat) => stat.groupName === "Passing")
                ?.statisticsItems?.find(
                  (items) => items.name === "Interceptions thrown"
                )?.away,
            },
            {
              home: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Time of Possession"
                )?.home,
              name: "TIME OF POSSESSION",
              away: allStats
                ?.find((stat) => stat.groupName === "Attacking")
                ?.statisticsItems?.find(
                  (items) => items.name === "Time of Possession"
                )?.away,
            },
          ];

          setStatsData(useableData);
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
        categories={["STATISTICS"]}
      />
      {/* {category === "LINEUPS" ? (
        <Lineups />
      ) :
       category === "EVENTS" ? (
        <Events />
      ) : ( */}
      <Statistics
        firstTeamName={firstTeamName}
        secondTeamName={secondTeamName}
        data={statsData}
      />
      {/*  )} */}
    </div>
  );
};

export default MatchSummery;
