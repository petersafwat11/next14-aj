import React from "react";
import classes from "./watchDetailsSingleTeam.module.css";
import LiveBtn from "../../live-button/LiveButton";
const WatchDetailsSingleTeam = ({
  leagueLogo,
  flagLogo,
  width,
  date,
  place,
  teamName,
  live,
}) => {
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
        {live && <LiveBtn text={"LIVE"} />}
        {/* )} */}
      </div>
    </div>
  );
};

export default WatchDetailsSingleTeam;
