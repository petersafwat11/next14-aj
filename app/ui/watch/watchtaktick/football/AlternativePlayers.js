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
            ? firstTeamSubstitutePlayers?.slice(0,12).map((player, index) => (
                <div key={index} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/football/player-icon-1.svg"
                    alt="helmet"
                    width="22"
                    height="17"
                  />
                  <p className={classes["player-name"]}>
                    {" "}
                    {player?.player?.name}
                  </p>
                </div>
              ))
            : secondTeamSubstitutePlayers.map((player, index) => (
                <div key={index} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/football/player-icon-1.svg"
                    alt="helmet"
                    width="22"
                    height="17"
                  />
                  <p className={classes["player-name"]}>
                    {player?.player?.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AlternativePlayers;
