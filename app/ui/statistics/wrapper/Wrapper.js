"use client";
import React, { useState } from "react";
import axios from "axios";
// import { groupEventsByDate } from "../../../utils/groupEventsByDate";
import ShowMoreStats from "../../showMore/ShowMoreStats";
import { leaguesData } from "../data";
import Header from "../header/Header";
import LeagueMenu from "../leage/League";
import classes from "./wrapper.module.css";
import { groupEventsByDate } from "@/app/lib/datesFunctions";
import dynamic from "next/dynamic";

const FixtureAndResults = dynamic(
  () => import("../fixitureAndResults/FixtureAndResults"),
  {
    ssr: false,
  }
);

import Standings from "../standings/Standings";
import ChampStandings from "../standings/championsStandings/ChampStandings";
const Wrapper = ({ data }) => {
  const [leagueActive, setLeagueActive] = useState("Premier League");
  const [statisticsType, setStatisticsType] = useState("fixtures");
  const [standingsType, setStandingsType] = useState("Leagues");
  const [standingsData, setStandingsData] = useState([]);
  // const [fixturesData, setFixturesData] = useState(data);
  const [fixturesData, setFixturesData] = useState(groupEventsByDate(data));
  const [resultsData, setResultsData] = useState([]);
  const [requiredWeekData, setRequiredWeekData] = useState(1);
  const getleagueData = async (leagueName, type, week) => {
    const leaguemetaData = leaguesData.find((item) => item.name === leagueName);
    const leagueIndex = leaguesData.findIndex(
      (item) => item.name === leagueName
    );
    setStandingsType(leagueIndex > 2 ? "Leagues" : "Cups");

    const query =
      type === "standings"
        ? {
            id: leaguemetaData.id,
            type: leagueIndex > 2 ? "Leagues" : "Cups",
          }
        : {
            id: leaguemetaData.id,
            type: type === "fixtures" ? "Fixtures" : "Results",
            week: week || requiredWeekData,
          };
    const response = await axios.get(
      `${process.env.BACKEND_SERVER}/statistics/${type}`,
      { params: query }
    );
    if (type === "standings") {
      setStandingsData(response?.data?.data);
    } else {
      const formatedData = groupEventsByDate(response?.data?.data);
      if (week) {
        type === "fixtures"
          ? setFixturesData((prevData) => [...prevData, ...formatedData])
          : setResultsData((prevData) => [...prevData, ...formatedData]);
      }
      type === "fixtures"
        ? setFixturesData(formatedData)
        : setResultsData(formatedData);
    }
  };
  const handleChangeLeagueActive = async (val) => {
    setLeagueActive(val);
    await getleagueData(val, statisticsType);
    setRequiredWeekData(1);
  };
  const changeStatisticsType = async (val) => {
    setStatisticsType(val);
    await getleagueData(leagueActive, val);
    setRequiredWeekData(1);
  };
  const showMoreHandeler = async () => {
    await getleagueData(leagueActive, statisticsType, requiredWeekData + 1);
    setRequiredWeekData(requiredWeekData + 1);
  };
  return (
    <div className={classes["container"]}>
      <LeagueMenu
        leagueActive={leagueActive}
        handleChangeLeagueActive={handleChangeLeagueActive}
      />
      <Header
        standingsType={standingsType}
        standingsData={standingsData}
        resultsData={resultsData}
        fixturesData={fixturesData}
        statisticsType={statisticsType}
        changeStatisticsType={changeStatisticsType}
      />
      {statisticsType == "fixtures" ? (
        <FixtureAndResults data={fixturesData} type={"fixture"} />
      ) : statisticsType == "standings" ? (
        standingsType == "Leagues" ? (
          <Standings data={standingsData} />
        ) : (
          <ChampStandings data={standingsData} />
        )
      ) : (
        <FixtureAndResults data={resultsData} type={"result"} />
      )}

      {statisticsType !== "standings" && (
        <div className="show-more-wrapper">
          <ShowMoreStats showMoreHandeler={showMoreHandeler} />
        </div>
      )}
    </div>
  );
};

export default Wrapper;
