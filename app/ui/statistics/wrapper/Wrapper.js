"use client";
import React, { useState } from "react";
import axios from "axios";
import { groupEventsByDate } from "../../../utils/groupEventsByDate";
import ShowMore from "../../showMore/ShowMore";
import { leaguesData } from "../data";
import Header from "../header/Header";
import LeagueMenu from "../leage/League";
import classes from "./wrapper.module.css";
const Wrapper = () => {
  const [leagueActive, setLeagueActive] = useState("Premier League");
  const [statisticsType, setStatisticsType] = useState("fixtures");
  const [standingsType, setStandingsType] = useState("Leagues");
  const [standingsData, setStandingsData] = useState([]);
  const [fixturesData, setFixturesData] = useState([]);
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
    const response = await axios.get(`statistics/${type}`, query);
    console.log("response ", response.data);
    if (response.data.length < 1) {
      return showMoreHandeler();
    } else if (type === "standings") {
      setStandingsData(response.data);
    } else {
      const formatedData = groupEventsByDate(response.data);
      type === "fixtures"
        ? setFixturesData(formatedData)
        : setResultsData(formatedData);
      if (week) {
        type === "fixtures"
          ? setFixturesData((prevData) => [...prevData, ...formatedData])
          : setResultsData((prevData) => [...prevData, ...formatedData]);
      }
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
    console.log("show more clicked");
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
      {statisticsType !== "standings" && (
        <div className="show-more-wrapper">
          <ShowMore showMoreHandeler={showMoreHandeler} />
        </div>
      )}
    </div>
  );
};

export default Wrapper;
