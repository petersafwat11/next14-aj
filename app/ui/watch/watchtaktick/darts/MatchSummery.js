"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import Lineups from "./Lineups";
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
  const getUsableData = useCallback((ss) => {
    const allGroups = statistics?.data?.data?.find(
      (stat) => stat.period === "ALL"
    )?.groups;

    // Function to extract and cache stats for a specific group.
    const getStatsForGroup = (groupName, allGroups) => {
      const groupStats = allGroups?.find(
        (group) => group.groupName === groupName
      );
      const statsItems = groupStats?.statisticsItems;
      return statsItems?.reduce((acc, item) => {
        acc[item.name] = { home: item.home, away: item.away };
        return acc;
      }, {});
    };

    // Retrieve and cache the 'Attacking' group statistics once.
    const attackingStats = getStatsForGroup("Attacking", allGroups);

    // Define the names and corresponding keys for the statistics we want to extract.
    const statsDefinitions = [
      { name: "THROWN 180", key: "Thrown 180" },
      { name: "THROWN OVER 140", key: "Thrown over 140" },
      { name: "THROWN OVER 100", key: "Thrown over 100" },
      { name: "HIGHEST CHECKOUT", key: "Highest checkout" },
      { name: "CHECKOUTS ACCURACY", key: "Checkouts accuracy" },
    ];

    // Map through the definitions to create 'useableData' using the cached 'attackingStats'.
    const useableData = statsDefinitions.map(({ name, key }) => ({
      name,
      home: attackingStats[key]?.home,
      away: attackingStats[key]?.away,
    }));
    return useableData;
  }, []);
  useEffect(() => {
    if (sportCategory && matchId) {
      const getEventIntialUpdatedData = async () => {
        try {
          const stats = await fetchEventData(
            "Statistics",
            matchId,
            sportCategory,
            eventDate
          );
          const useableData = getUsableData(stats);
          setStatisticsData(useableData);
        } catch (error) {
          console.error("Error fetching event API data:", error);
        }
      };
      getEventIntialUpdatedData();
      const intervalId = setInterval(getEventIntialUpdatedData, 60000);
      return () => clearInterval(intervalId);
    }
  }, [matchId, sportCategory, eventDate, getUsableData]);

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
      <Statistics
        data={statisticsData}
        firstTeamName={firstTeamName}
        secondTeamName={secondTeamName}
      />
    </div>
  );
};

export default MatchSummery;
