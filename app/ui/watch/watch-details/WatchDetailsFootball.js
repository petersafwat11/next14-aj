"use client";
import classes from "./watchDetails.module.css";
import LiveBtn from "../../live-button/LiveButton";
import { useEffect, useState } from "react";
import {
  convertDate,
  determineLive,
  getMatchDate,
} from "@/app/lib/datesFunctions";
const WatchDetails = ({
  lieageImage,
  firstTeamImage,
  firstTeamName,
  seconteamImage,
  seconteamName,
  date,
  place,
  playStream,
  eventEnds,
  category,
}) => {
  const [playStreaming, setPlayStreaming] = useState(determineLive(playStream));
  const [endedEvent, setEndedEvent] = useState(determineLive(eventEnds));
  const [dateAndTime, setDateAndTime] = useState("");

  useEffect(() => {
    setDateAndTime(`${getMatchDate(date, true)}- ${convertDate(date).time}`);

    const interval = setInterval(() => {
      setPlayStreaming(determineLive(playStream));
      setEndedEvent(determineLive(eventEnds));
    }, 1000);

    return () => clearInterval(interval);
  }, [playStream, eventEnds, date]);

  return (
    <div className={classes["watch-details"]}>
      <div className={classes["watch-details-first"]}>
        <img
          crossOrigin="anonymous"
          className={classes["league-image"]}
          src={lieageImage}
          alt="other"
          // width={imagesDimentions.lieageImageWidth}
          // height={imagesDimentions.lieageImageHeigth}
        />
        <div className={classes["date-and-place"]}>
          <p className={classes["date"]}>{dateAndTime}</p>
          <p className={classes["place"]}>{place}</p>
        </div>
      </div>
      <div className={classes["watch-details-second"]}>
        <div className={classes["first-team"]}>
          <div
            className={
              category === "fights"
                ? classes["fighter-icon-wrapper"]
                : classes[""]
            }
          >
            <img
              crossOrigin="anonymous"
              className={classes["team-image"]}
              src={firstTeamImage}
              alt="logo"
              // height={imagesDimentions.firstTeamImageHeight}
              // width={imagesDimentions.firstTeamImageWidth}
            />
          </div>
          <p className={classes["first-team-name"]}>{firstTeamName}</p>
        </div>
        <span className={classes["vs"]}>VS</span>
        <div className={classes["second-team"]}>
          <p className={classes["second-team-name"]}>{seconteamName}</p>
          <div
            className={
              category === "fights"
                ? classes["fighter-icon-wrapper"]
                : classes[""]
            }
          >
            <img
              crossOrigin="anonymous"
              className={classes["team-image"]}
              src={seconteamImage}
              alt="logo"
              // height={imagesDimentions.seconteamImageHeight}
              // width={imagesDimentions.seconteamImageWidth}
            />
          </div>
        </div>
      </div>
      <div className={classes["watch-details-last"]}>
        {/* <p className={classes["half"]}>{half}</p> */}
        {playStreaming && !endedEvent && <LiveBtn text={"LIVE"} />}
      </div>
    </div>
  );
};

export default WatchDetails;
