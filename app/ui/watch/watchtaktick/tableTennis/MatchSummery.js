"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Summery from "../summary/Summery";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
import { fetchEventData } from "@/app/lib/getEventData";
const MatchSummery = ({ sportCategory, matchId, eventDate, customAPi }) => {
  const [category, setCategory] = useState("LINEUPS");
  const changeCategory = (category) => {
    setCategory(category);
  };
  const [summeryData, setSummeryData] = useState([]);
  const getUsableData = useCallback((statistics) => {
    const useableData = statistics?.data?.data?.filter(
      (stat) => stat.period !== "ALL"
    );
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
          setSummeryData(useableData);
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
        categories={["LINEUPS", "SUMMARY"]}
      />
      {category === "LINEUPS" ? (
        <Lineups data={customAPi} />
      ) : (
        <Summery data={summeryData} />
      )}
    </div>
  );
};

export default MatchSummery;
