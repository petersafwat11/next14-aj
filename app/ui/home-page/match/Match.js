"use client";
import React, { useEffect, useState } from "react";
import LiveBtn from "./LiveBtn";
import RemainingTime, { RemainingTimeMobile } from "./RemainingTime";
import WatchBtn from "./WatchBtn";
import classes from "./match.module.css";
import {
  calcRemainingTime,
  determineLive,
  convertDate,
  getMatchDate,
} from "@/app/lib/datesFunctions";

export const Match = ({ matchData, type, index, length }) => {
  const [live, setLive] = useState(determineLive(""));
  const [remainingTime, setRemainingTime] = useState("");
  const [endedEvent, setEndedEvent] = useState(
    determineLive(matchData?.endedEvent)
  );
  const [dateAndTime, setDateAndTime] = useState("");
  useEffect(() => {
    setDateAndTime(
      `${getMatchDate(matchData?.eventDate, true)}- ${
        convertDate(matchData?.eventDate).time
      }`
    );
    const interval = setInterval(() => {
      setRemainingTime(calcRemainingTime(matchData?.eventDate));
      setLive(determineLive(matchData?.playStream));
      setEndedEvent(determineLive(matchData?.endedEvent));
    }, 1000);
    return () => clearInterval(interval);
  }, [matchData?.eventDate, matchData?.playStream, matchData?.endedEvent]);
  return (
    <>
      <div
        className={
          type === "hot-matches" ? classes["hot-match"] : classes["other-match"]
        }
      >
        <div className={classes["match-first"]}>
          <p className={classes["date"]}> {dateAndTime}</p>
          <RemainingTimeMobile timer={remainingTime} live={live} />

          <p className={classes["leage"]}>{matchData?.eventLeague}</p>
        </div>
        <div className={classes["match-second"]}>
          <div className={classes["match-details"]}>
            <p className={classes["date"]}>{dateAndTime}</p>
            <p className={classes["leage"]}>{matchData?.eventLeague}</p>
          </div>
          <LiveBtn live={live && !endedEvent} />
          {matchData?.firstTeamName && matchData?.secondTeamName ? (
            <>
              <div className={classes["first-team"]}>
                <p className={classes["first-team-name"]}>
                  {matchData?.firstTeamName}
                </p>
                {matchData?.firstTeamLogo === null ||
                matchData?.firstTeamLogo === undefined ? null : (
                  <img
                    crossOrigin="anonymous"
                    className={classes["first-team-image"]}
                    src={`${process.env.BACKEND_SERVER}/img/matches/${matchData?.firstTeamLogo}`}
                    alt="logo"
                    // width={28}
                  />
                )}
              </div>
              <div className={classes["match-vs"]}>vs</div>
              <div className={classes["second-team"]}>
                {matchData?.secondTeamLogo === null ||
                matchData?.secondTeamLogo === undefined ? null : (
                  <img
                    crossOrigin="anonymous"
                    className={classes["second-team-image"]}
                    src={`${process.env.BACKEND_SERVER}/img/matches/${matchData?.secondTeamLogo}`}
                    alt="logo"
                    // width={28}
                  />
                )}

                <p className={classes["second-team-name"]}>
                  {matchData?.secondTeamName}
                </p>
              </div>
            </>
          ) : (
            <div className={classes["teams-title"]}>
              {matchData?.teamsTitle}
            </div>
          )}
          {/* {!true ? (
          <div className={classes["status"]}>2nd Half: 47’</div>
        ) : ( */}
          {/* {remaingTime ? (
          <div className={classes["remaining-time"]}>{remaingTime}</div>
        ) : (
          <div className={classes["white-space"]}></div>
        )} */}
          <RemainingTime timer={remainingTime} live={live} />
          <WatchBtn
            name={
              matchData?.firstTeamName && matchData?.secondTeamName
                ? `${matchData?.firstTeamName.replace(
                    / /g,
                    "-"
                  )}-VS-${matchData?.secondTeamName.replace(/ /g, "-")}`
                : `${matchData?.teamsTitle.replace(/ /g, "-")}`
            }
          />
        </div>
      </div>
      {index + 1 !== length && (
        <span
          className={
            type === "hot-matches"
              ? classes["hot-matches-devider"]
              : classes["other-matches-devider"]
          }
        ></span>
      )}
    </>
  );
};

export default Match;
