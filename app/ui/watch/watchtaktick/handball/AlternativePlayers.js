import Image from "next/image";
import React from "react";
import classes from "./alternativePlayers.module.css";
const AlternativePlayers = ({
  firstTeamSubstitutePlayers,
  secondTeamSubstitutePlayers,
  firstTeamName,
  secondTeamName,
  option,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <p>{option === 1 ? firstTeamName : secondTeamName} </p>
        <p>Bench</p>
      </div>
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <div className={classes["players"]}>
          {option === 1
            ? firstTeamSubstitutePlayers?.map((player, index) => (
                <div key={index} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/handball/red-player.svg"
                    alt="helmet"
                    width="16"
                    height="21"
                  />
                  <p className={classes["player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))
            : secondTeamSubstitutePlayers?.map((player, index) => (
                <div key={index} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/handball/red-player.svg"
                    alt="helmet"
                    width="16"
                    height="21"
                  />
                  <p className={classes["player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AlternativePlayers;
