"use client";

import React, { useEffect, useRef, useState,useCallback } from "react";
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
  const changeCategory = (category) => {
    setCategory(category);
  };
  const [statisticsData, setStatisticsData] = useState(null);
  const [lineupsData, setLineupsData] = useState([]);
  const statisticsDataRef = useRef([
    {
      name: "Shots",
      home: 0,
      away: 0,
    },
    {
      name: "Faceoffs won",
      home: 0,
      away: 0,
    },
    {
      name: "Blocked",
      home: 0,
      away: 0,
    },
    {
      name: "Takeaways",
      home: "0/0 (0%)",
      away: "40/0 (0%)",
    },
    {
      name: "Giveaways",
      home: 0,
      away: 0,
    },
    {
      name: "Hits",
      home: 0,
      away: 0,
    },
    {
      name: "Penalty minutes",
      home: 0,
      away: 0,
    },
  ]);
  const getUsableData = useCallback((statistics) => {
    const allStats = statistics?.data?.data
      ?.find((stat) => stat.period === "ALL")
      .groups.find((item) => item.groupName === "Attacking").statisticsItems;
    const useableData = allStats.filter((largerObj) =>
      statisticsDataRef.current.some(
        (smallerObj) => smallerObj.name === largerObj.name
      )
    );
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
      const intervalId = setInterval(getUpdatedData, 60000);
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
