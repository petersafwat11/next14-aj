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
  const getUsableData = useCallback((statistics) => {
    const allGroups = statistics?.data?.data?.find(
      (stat) => stat.period === "ALL"
    )?.groups;

    // Function to convert groups array into an object for constant-time lookups.
    function createGroupLookup(groups) {
      return groups.reduce((acc, group) => {
        acc[group.groupName] = group.statisticsItems.reduce((itemAcc, item) => {
          itemAcc[item.name] = item;
          return itemAcc;
        }, {});
        return acc;
      }, {});
    }

    // Convert allStats into a lookup object once
    const statsLookup = createGroupLookup(allGroups);

    const statsList = [
      { groupName: "Points", itemName: "Total", display: "TOTAL POINTS" },
      { groupName: "Service", itemName: "Aces", display: "ACES" },
      {
        groupName: "Service",
        itemName: "Double faults",
        display: "DOUBLE FAULTS",
      },
      {
        groupName: "Service",
        itemName: "Break points saved",
        display: "BREAK POINTS SAVED",
      },
      {
        groupName: "Points",
        itemName: "Service points won",
        display: "SERVICE POINTS WON",
      },
      {
        groupName: "Points",
        itemName: "Receiver points won",
        display: "RECEIVER POINTS WON",
      },
    ];

    // Map over statsList to extract useableData.
    const useableData = statsList.map(({ groupName, itemName, display }) => ({
      name: display,
      home: statsLookup[groupName]?.[itemName]?.home ?? null,
      away: statsLookup[groupName]?.[itemName]?.away ?? null,
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
      const intervalId = setInterval(getEventIntialUpdatedData, 30000);
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
