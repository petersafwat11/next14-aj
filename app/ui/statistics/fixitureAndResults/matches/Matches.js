import Image from "next/image";
import React from "react";
import classes from "./matches.module.css";

const Matches = ({ type, groupData }) => {
  console.log("matches data", groupData);
  return (
    <div className={classes["matches"]}>
      {groupData.map((itemData, index) => {
        return <Match data={itemData} key={index} type={type} />;
      })}
    </div>
  );
};
export default Matches;

export const Match = ({ type, data }) => {
  const extractTime = (dateString) => {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits

    const time = `${hours}:${minutes}`;

    return time;
  };

  return (
    <div className={classes["match"]}>
      {type !== "result" ? (
        <div className={classes["match-date"]}>
          {extractTime(data.adjustedDateKey)}
        </div>
      ) : (
        <div></div>
      )}
      {type !== "result" && (
        <div className={classes["match-date-mobile"]}>
          {" "}
          {extractTime(data.adjustedDateKey)}
        </div>
      )}

      <div className={classes["first-team"]}>
        <p className={classes["first-team-name"]}>{data.teams.home.name}</p>

        <Image
          className={classes["team-image"]}
          src={data.teams.home.logo}
          alt="team-logo"
          width="34"
          height="34"
        />
      </div>
      <div className={classes["center"]}>
        <div className={classes["match-date-small-mobile"]}>17:30</div>
        <p className={classes["staduim"]}>{data.fixture.venue.name}</p>
        {type === "result" ? (
          <div className={classes["result"]}>
            <p>{data.score.fulltime.home}</p>
            <p>-</p>
            <p>{data.score.fulltime.away}</p>
          </div>
        ) : (
          <div className={classes["vs"]}> vs</div>
        )}
      </div>
      <div className={classes["second-team"]}>
        <Image
          className={classes["team-image"]}
          src={data.teams.away.logo}
          alt="team-logo"
          width="27"
          height="36"
        />
        <p className={classes["second-team-name"]}>{data.teams.away.name}</p>
      </div>
    </div>
  );
};
