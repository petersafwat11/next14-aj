"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GlobalHeader from "../globalHeader/GlobalHeader";
import Statistics from "../statistics/Statistics";
import Lineups from "./Lineups";
import classes from "./matchSummery.module.css";
const MatchSummery = ({
  sportCategory,
  matchId,
  eventDate,
  secondTeamName,
  firstTeamName,
}) => {
  const [category, setCategory] = useState("LINEUPS");
  const [statisticsData, setStatisticsData] = useState([
    {
      name: "POSSESSION",
      home: 0,
      away: 0,
    },
    {
      name: "TRIES",
      home: 0,
      away: 0,
    },
    {
      name: "CONVERSIONS",
      home: 0,
      away: 0,
    },

    {
      name: "PENALTY GOALS",
      home: 0,
      away: 0,
    },
    {
      name: "SCRUMS",
      home: 0,
      away: 0,
    },
    {
      name: "TURNOVERS",
      home: 0,
      away: 0,
    },
  ]);
  const [lineupsData, setLineupsData] = useState();

  const changeCategory = (category) => {
    setCategory(category);
  };
  useEffect(() => {
    if (sportCategory && matchId) {
      (async () => {
        try {

          const lineups = await axios.get(
            `${process.env.BACKEND_SERVER}/sports/eventAPIData/lineups`,
            {
              params: {
                matchId,
                sportCategory,
                eventDate,
                dataType: "Lineups",
              },
            }
          );
          setLineupsData(lineups?.data?.data);
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
        categories={["LINEUPS"]}
      />
        <Lineups data={lineupsData} />
    </div>
  );
};

export default MatchSummery;
