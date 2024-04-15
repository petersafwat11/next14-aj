import Image from "next/image";
import React from "react";
import classes from "./alternativePlayers.module.css";
const AlternativePlayers = ({
  firstTeamAlternativePlayers,
  secondTeamSubstitutePlayers,
  option,
  firstTeamName,
  secondTeamName,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <p>{option === 1 ? firstTeamName : secondTeamName}</p>
        <p>Bench</p>
      </div>
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <div className={classes["players"]}>
          {option === 1
            ? firstTeamAlternativePlayers?.map((player) => (
                <div key={player} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/hockey/pink-helmet.svg"
                    alt="helmet"
                    width="16"
                    height="21"
                  />
                  <p className={classes["player-name"]}>C. Ronaldo</p>
                </div>
              ))
            : secondTeamSubstitutePlayers?.map((player) => (
                <div key={player} className={classes["player"]}>
                  <Image
                    className={classes["team-shirt"]}
                    src="/svg/watch/hockey/pink-helmet.svg"
                    alt="helmet"
                    width="16"
                    height="21"
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
