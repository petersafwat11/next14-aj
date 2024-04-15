import Image from "next/image";
import React from "react";
import classes from "./fighters.module.css";
const Fighters = ({ data }) => {
  return (
    <div className={classes["fighters"]}>
      <Image
        className={classes["logo"]}
        src="/svg/watch/wwe/logo.svg"
        alt="logo"
        width="42"
        height="40"
      />

      <h3 className={classes["title"]}>FEATURED FIGHERS</h3>
      <div className={classes["players-stats-container"]}>
        <div className={classes["item"]}>
          {data.players.map((player, index) => (
            <div key={index} className={classes["player-item"]}>
              <h4>{player.name}</h4>
              <p>{`Age ${player.age}`}</p>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Fighters;
