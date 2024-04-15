import React from "react";
import classes from "./summery.module.css";
const Summery = ({ data, secondTeamName, firstTeamName }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["left"]}>
        <p className={classes["player-name"]}>{firstTeamName}</p>
        <p className={classes["player-name"]}>{secondTeamName}</p>
      </div>
      <div className={classes["right"]}>
        <div className={classes["header"]}>
          <p className={classes["header-item"]}>1st</p>
          <p className={classes["header-item"]}>2nd</p>
          <p className={classes["header-item"]}>3rd</p>
          {data.length > 3 && <p className={classes["header-item"]}>4th</p>}
          {data.length > 4 && <p className={classes["header-item"]}>5th</p>}
        </div>
        <span className={classes["devider"]}> </span>
        <div className={classes["body"]}>
          <div className={classes["body-item"]}>
            {data.map((item) => (
              <p key={item} className={classes[""]}>
                {item?.groups
                  ?.find((stat) => stat.groupName === "Points")
                  ?.statisticsItems?.find((stat) => stat.name === "Points won")
                  ?.home || "0"}
              </p>
            ))}
          </div>
          <span className={classes["players-devider"]}></span>
          <div className={classes["body-item"]}>
            {data.map((item) => (
              <p key={item} className={classes[""]}>
                {item?.groups
                  ?.find((stat) => stat.groupName === "Points")
                  ?.statisticsItems?.find((stat) => stat.name === "Points won")
                  ?.away || "0"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summery;
