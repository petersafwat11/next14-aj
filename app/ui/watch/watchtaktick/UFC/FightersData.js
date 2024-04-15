import Image from "next/image";
import React from "react";
import classes from "./fightersData.module.css";
const FightersData = ({ data }) => {
  return (
    <div className={classes["fighters"]}>
      <Image
        className={classes["logo"]}
        src="/svg/watch/ufc/logo.svg"
        alt="logo"
        width="95"
        height="39"
      />
      <h3 className={classes["title"]}>MAIN CARD</h3>
      <span className={classes["devider"]}></span>
      <div className={classes["players-stats-container"]}>
        <div className={classes["item"]}>
          {data.firstTeam.players.map((player, index) => (
            <div className={classes["player-item"]} key={index}>
              <h4>{player.name}</h4>
              <p>{player.result}</p>
            </div>
          ))}{" "}
        </div>
      </div>
      <h3 className={classes["title-2"]}>PRELIMINARY CARD</h3>
      <span className={classes["devider"]}></span>

      <div className={classes["players-stats-container"]}>
        <div className={classes["item"]}>
          {data.secondTeam.players.map((player, index) => (
            <div className={classes["player-item"]} key={index}>
              <h4>{player.name}</h4>
              <p>{player.result}</p>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default FightersData;
