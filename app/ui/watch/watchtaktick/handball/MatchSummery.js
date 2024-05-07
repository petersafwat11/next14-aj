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
  const [category, setCategory] = useState("LINEUPS");
  const [statisticsData, setStatisticsData] = useState(null);
  const [lineupsData, setLineupsData] = useState(null);

  const changeCategory = (category) => {
    setCategory(category);
  };
  const getUsableData = useCallback((statistics) => {
    const allStats = statistics?.data?.data?.find(
      (stat) => stat.period === "ALL"
    )?.groups;

    // Cache for storing already found groups to avoid repeated searches.
    const groupCache = {};

    // Function to get the statistics for a given group and stat name.
    const getStatData = (groupName, itemName) => {
      // If the group isn't in the cache, find it and add it to the cache.
      if (!groupCache[groupName]) {
        const group = allStats?.find(
          (stat) => stat.groupName === groupName
        )?.statisticsItems;
        groupCache[groupName] = group?.reduce((acc, item) => {
          acc[item.name] = item;
          return acc;
        }, {});
      }
      // Utilize the cache for quick access to the statistics items.
      return groupCache[groupName][itemName];
    };

    const useableData = [
      { groupName: "Saves", itemName: "Saves" },
      { groupName: "Penalty", itemName: "2 min penalty" },
      { groupName: "Goals extra", itemName: "Goals in powerplay" },
      { groupName: "Goals", itemName: "7 meters" },
      { groupName: "Goals extra", itemName: "Goal streak" },
    ].map(({ groupName, itemName }) => {
      const itemStat = getStatData(groupName, itemName);
      return {
        name: itemName.toUpperCase(), // Assuming you want the names to be uppercase, like "7 METRES"
        home: itemStat?.home,
        away: itemStat?.away,
      };
    });
    return useableData;
  }, []);
  useEffect(() => {
    if (sportCategory && matchId) {
      const getEventIntialData = async () => {
        try {
          const responses = await Promise.all([
            fetchEventData("Statistics", matchId, sportCategory, eventDate),
            fetchEventData("Lineups", matchId, sportCategory, eventDate),
          ]);

          const [statisticsResponse, lineupsResponse] = responses;
          setLineupsData(lineupsResponse?.data?.data);
          const useableData = getUsableData(statisticsResponse);
          setStatisticsData(useableData);
        } catch (error) {
          console.error("Error fetching event API data:", error);
        }
      };
      getEventIntialData();
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
      const intervalId = setInterval(getUpdatedData, 180000);
      return () => clearInterval(intervalId);
    }
  }, [matchId, sportCategory, eventDate, getUsableData]);
  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["LINEUPS", "STATISTICS"]}
      />
      {category === "LINEUPS" ? (
        <Lineups
          data={lineupsData}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
        />
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
