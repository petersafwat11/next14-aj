"use client";
import React, { useEffect, useState } from "react";
import classes from "./watchDetailsSingleTeam.module.css";
import LiveBtn from "../../live-button/LiveButton";
import { determineLive } from "@/app/lib/datesFunctions";
const WatchDetailsSingleTeam = ({
  leagueLogo,
  flagLogo,
  width,
  date,
  place,
  teamName,
  playStream,
  eventEnds,
}) => {
  const [playStreaming, setPlayStreaming] = useState(determineLive(playStream));
  const [endedEvent, setEndedEvent] = useState(determineLive(eventEnds));
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayStreaming(determineLive(playStream));
      setEndedEvent(determineLive(eventEnds));
    }, 1000);

    return () => clearInterval(interval);
  }, [playStream, eventEnds]);

  return (
    <div className={classes["watch-details"]}>
      <div className={classes["watch-details-first"]}>
        <img
          className={classes["league-logo"]}
          crossOrigin="anonymous"
          src={leagueLogo}
          alt="other"
          // width={width}
          // height={imagesDimentions.lieageImageHeigth}
        />
        <div className={classes["date-and-place"]}>
          <p className={classes["date"]}>{date}</p>
          <p className={classes["place"]}>
            {place}
            {/* UAE, Abu Dhabi International Circuit */}
          </p>
        </div>
      </div>
      <div className={classes["watch-details-last"]}>
        <div className={classes["team"]}>
          <h3 className={classes["team-title"]}>{teamName}</h3>
          <img
            className={classes["team-logo"]}
            crossOrigin="anonymous"
            src={flagLogo}
            alt="other"
            width={width}
            // height={imagesDimentions.lieageImageHeigth}
          />
        </div>
        {/* {true ? (
          <div className={classes["not-live"]}>LIVE</div>
        ) : ( */}
        {playStreaming && !endedEvent && <LiveBtn text={"LIVE"} />}
        {/* )} */}
      </div>
    </div>
  );
};

export default WatchDetailsSingleTeam;
