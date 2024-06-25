"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import Events from "./events/Events";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
import { fetchEventData } from "@/app/lib/getEventData";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
  eventStadium,
}) => {
  const [category, setCategory] = useState("LINEUPS");
  const [lineupsData, setLineupsData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const changeCategory = (category) => {
    setCategory(category);
  };
  const getUsableData = useCallback((statistics) => {
    const useableData = [
      "Total Shots",
      "Shots on Goal",
      "Shots off Goal",
      "Blocked Shots",
      "Total passes",
      "Passes accurate",
      "Corner Kicks",
      "Offsides",
      "Fouls",
      "Yellow Cards",
      "Red Cards",
    ].map((item) => {
      return {
        home: statistics?.data?.data[0].statistics.find(
          (apiItem) => apiItem.type == item
        ).value,
        name:
          item === "Corner Kicks"
            ? "Corners"
            : item === "Shots on Goal"
            ? "Shots on Target"
            : item === "Shots off Goal"
            ? "Shots off Target"
            : item === "Passes accurate"
            ? "Accurate Passes"
            : item,

        away: statistics.data.data[1].statistics.find(
          (apiItem) => apiItem.type == item
        ).value,
      };
    });
    return useableData;
  }, []);
  useEffect(() => {
    if (sportCategory && matchId) {
      const getIntialData = async () => {
        try {
          const responses = await Promise.all([
            fetchEventData("Statistics", matchId, sportCategory, eventDate),
            fetchEventData("Lineups", matchId, sportCategory, eventDate),
            fetchEventData("Events", matchId, sportCategory, eventDate),
          ]);
          const [statistics, lineups, events] = responses;
          const useableData = getUsableData(statistics);
          setStatsData(useableData);
          setLineupsData(lineups?.data?.data);
          setEventsData(events?.data?.data);
        } catch (err) {
          console.log("error", err);
        }
      };
      getIntialData();
      const getUpdatedData = async () => {
        try {
          const responses = await Promise.all([
            fetchEventData("Statistics", matchId, sportCategory, eventDate),
            fetchEventData("Events", matchId, sportCategory, eventDate),
          ]);
          const [statistics, events] = responses;
          const useableData = getUsableData(statistics);
          setStatsData(useableData);
          setEventsData(events?.data?.data);
        } catch (err) {
          console.log("error", err);
        }
      };
      const intervalId = setInterval(getUpdatedData, 10000);
      return () => clearInterval(intervalId);
    }
  }, [matchId, sportCategory, eventDate, getUsableData]);

  return (
    <div className={classes["container"]}>
      <GlobalHeader
        category={category}
        changeCategory={changeCategory}
        categories={["LINEUPS", "STATS", "EVENTS"]}
      />
      {category === "LINEUPS" ? (
        <Lineups
          data={lineupsData}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
        />
      ) : category === "EVENTS" ? (
        <Events
          eventStadium={eventStadium}
          data={eventsData}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
        />
      ) : (
        <Statistics
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
          data={statsData}
        />
      )}
    </div>
  );
};

export default MatchSummery;
