"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import classes from "./matchSummery.module.css";
import { fetchEventData } from "@/app/lib/getEventData";

const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
}) => {
  const [category, setCategory] = useState("STATISTICS");
  const [statisticsData, setStatisticsData] = useState(null);

  const changeCategory = (category) => {
    setCategory(category);
  };
  const getUsableData = useCallback((statistics) => {
    const allStats = statistics?.data?.data?.find(
      (stat) => stat.period === "ALL"
    )?.groups;

    const statsDictionary = (groupName) => {
      const group = allStats?.find(
        (stat) => stat.groupName === groupName
      )?.statisticsItems;
      return group?.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {});
    };

    const scoringStats = statsDictionary("Scoring");
    const otherStats = statsDictionary("Other");

    const statMappings = [
      { name: "FIELD GOALS %", stat: "Field goals", group: scoringStats },
      { name: "3 POINTERS %", stat: "3 pointers", group: scoringStats },
      { name: "FREE THROWS %", stat: "Free throws", group: scoringStats },
      { name: "TOTAL REBOUNDS", stat: "Rebounds", group: otherStats },
      {
        name: "OFFENSIVE REBOUNDS",
        stat: "Offensive rebounds",
        group: otherStats,
      },
      { name: "ASSISTS", stat: "Assists", group: otherStats }, // Assumed that the stat should be "Assists" not "Offensive rebounds" again
      { name: "BLOCKS", stat: "Blocks", group: otherStats },
      { name: "STEALS", stat: "Steals", group: otherStats },
      { name: "TURNOVERS", stat: "Turnovers", group: otherStats },
      { name: "FOULS", stat: "Fouls", group: otherStats },
    ];

    const useableData = statMappings.map(({ name, stat, group }) => ({
      name,
      home: group[stat]?.home,
      away: group[stat]?.away,
    }));
    return useableData;
  }, []);

  useEffect(() => {
    if (sportCategory && matchId) {
      const getUpdatedData = async () => {
        const stats = await fetchEventData(
          "Statistics",
          matchId,
          sportCategory,
          eventDate
        );
        const useableData = getUsableData(stats);
        setStatisticsData(useableData);
      };
      getUpdatedData();
      const intervalId = setInterval(getUpdatedData, 120000);
      return () => clearInterval(intervalId);
    }
  }, [matchId, sportCategory, eventDate, getUsableData]);

  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["STATISTICS"]}
      />
      <Statistics
        data={statisticsData}
        firstTeamName={firstTeamName}
        secondTeamName={secondTeamName}
      />
    </div>
  );
};

export default MatchSummery;
