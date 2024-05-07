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
  const getUsableData = useCallback((statisticsResponse) => {
    const statNames = [
      "Runs",
      "Doubles",
      "Triples",
      "Home runs",
      "Base on balls",
      "Hits",
    ];
    const allStats = statisticsResponse?.data?.data?.find(
      (stat) => stat.period === "ALL"
    ).groups;
    const battingStatsGroup = allStats?.find(
      (group) => group.groupName === "Batting"
    )?.statisticsItems;
    // Reduce the battingStatsGroup into an object for constant-time lookups.
    const battingStatsDictionary = battingStatsGroup.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    const useableData = statNames.map((name) => {
      const stat = battingStatsDictionary[name];
      return {
        name,
        home: stat?.home,
        away: stat?.away,
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
          const useableData = getUsableData(statisticsResponse);
          setStatisticsData(useableData);
          setLineupsData(lineupsResponse?.data?.data);
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
      const intervalId = setInterval(getUpdatedData, 210000);
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
        <Lineups data={lineupsData} />
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
