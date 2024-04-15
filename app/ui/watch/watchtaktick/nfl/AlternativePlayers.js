import Image from "next/image";
import React from "react";
import classes from "./alternativePlayers.module.css";
const AlternativePlayers = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <p>Manchester United </p>
        <p>Bench</p>
      </div>
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <div className={classes["players"]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((player) => (
            <div key={player} className={classes["player"]}>
              <Image
                className={classes["team-shirt"]}
                src="/svg/watch/nfl/player-icon-1.svg"
                alt="helmet"
                width="18"
                height="19"
              />
              <p className={classes["player-name"]}>C. Ronaldo</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlternativePlayers;
