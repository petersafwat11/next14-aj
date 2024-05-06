"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Standings from "../standings/Standings";
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
  const [category, setCategory] = useState("STANDINGS");
  const [statisticsData, setStatisticsData] = useState(null);

  const changeCategory = (category) => {
    setCategory(category);
  };
  const getUsableData = useCallback((statistics) => {
    const allStats = statistics?.data?.data?.find(
      (stat) => stat.period === "ALL"
    )?.groups;

    // Create a function that returns a group array by name for constant-time lookups.
    function getGroupStats(groupName) {
      const group = allStats?.find(
        (stat) => stat.groupName === groupName
      )?.statisticsItems;
      return group?.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {});
    }

    // Create lookup dictionaries for each group of interest.
    const possessionStats = getGroupStats("Possession");
    const scoringStats = getGroupStats("Scoring");
    const otherStats = getGroupStats("Other");

    // Helper function to retrieve the data struct.
    function getStats(name, item, statsGroup) {
      return {
        name,
        home: statsGroup[item]?.home,
        away: statsGroup[item]?.away,
      };
    }

    const useableData = [
      getStats("POSSESSION", "Ball possession", possessionStats),
      getStats("TRIES", "Tries", scoringStats),
      getStats("CONVERSIONS", "Conversions", scoringStats),
      getStats("PENALTY GOALS", "Penalty goals", scoringStats),
      getStats("SCRUMS", "Scrums", otherStats),
      getStats("TURNOVERS", "Turnovers", otherStats),
    ];
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
        categories={["STATISTICS"]}
      />
      {/* {category === "LINEUPS" ? (
        <Lineups />
      ) : category === "STANDINGS" ? (
        <Standings
          numOfActiveNunbers={2}
          items={["PL", "PTS"]}
          footerElements={["Playoffs", "Qualification Playoffs"]}
        />
      ) : ( */}
      <Statistics
        data={statisticsData}
        firstTeamName={firstTeamName}
        secondTeamName={secondTeamName}
      />
      {/* )} */}
    </div>
  );
};

export default MatchSummery;
