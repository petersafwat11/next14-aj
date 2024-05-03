"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Summery from "../summary/Summery";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
const MatchSummery = ({ sportCategory, matchId, eventDate, customAPi }) => {
  const [category, setCategory] = useState("LINEUPS");
  const changeCategory = (category) => {
    setCategory(category);
  };
  const [summeryData, setSummeryData] = useState([]);
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
              },
            }
          );

          const useableData = statistics?.data?.data?.filter(
            (stat) => stat.period !== "ALL"
          );
          setSummeryData(useableData);
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
