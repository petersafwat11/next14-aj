import Image from "next/image";
import React from "react";
import classes from "./alternativePlayers.module.css";
const AlternativePlayers = ({
  awaySubstitutePlayers,
  homeSubstitutePlayers,
  selectedOption,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <p>Manchester United </p>
        <p>Bench</p>
      </div>
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <div className={classes["players"]}>
          {selectedOption === 1
            ? homeSubstitutePlayers.map((player) => (
                <div key={player} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/basketball/player-icon-1.svg"
                    alt="helmet"
                    width="16"
                    height="17"
                  />
                  <p className={classes["player-name"]}>
                    {" "}
                    {player.player.name}
                  </p>
                </div>
              ))
            : awaySubstitutePlayers.map((player) => (
                <div key={player} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/basketball/player-icon-1.svg"
                    alt="helmet"
                    width="16"
                    height="17"
                  />
                  <p className={classes["player-name"]}>
                    {" "}
                    {player.player.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AlternativePlayers;
