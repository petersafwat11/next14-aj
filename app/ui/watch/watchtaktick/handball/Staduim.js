import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./staduim.module.css";

const Staduim = ({
  data,
  firstTeamSubstitutePlayers,
  secondTeamSubstitutePlayers,
}) => {
  const classNames = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
  ];
  const [alternativePlayers, setAlternativePlayers] = useState({
    firstTeam: 1,
    secondTeam: 1,
  });
  const changeFirstTeamOptions = (option) => {
    setAlternativePlayers({
      firstTeam: option,
      secondTeam: alternativePlayers.secondTeam,
    });
  };
  const changeSecondTeamOptions = (option) => {
    setAlternativePlayers({
      firstTeam: alternativePlayers.firstTeam,
      secondTeam: option,
    });
  };
  return (
    <div className={classes["container"]}>
      <div className={classes["right"]}>
        <MatchDots
          vertical={true}
          options={[1, 2]}
          selectedOption={alternativePlayers.firstTeam}
          changeOptions={changeFirstTeamOptions}
        />
        <div className={classes["alternative-players"]}>
          {alternativePlayers.firstTeam === 1
            ? firstTeamSubstitutePlayers?.slice(0, 7)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/handball/red-player.svg"
                    alt="helmet"
                    width="26"
                    height="33"
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))
            : firstTeamSubstitutePlayers?.slice(7)?.map((player) => (
                <div key={player} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/handball/red-player.svg"
                    alt="helmet"
                    width="26"
                    height="33"
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))}
        </div>
      </div>
      <div className={classes["stadium"]}>
        {data?.home?.players?.slice(0, 7)?.map((player, index) => (
          <div key={index} className={classes[classNames[index]]}>
            <Image
              className={classes["team-shirt"]}
              src="/svg/watch/handball/red-player.svg"
              alt="helmet"
              width="37"
              height="35"
            />
            <p className={classes["player-name"]}>{player.player.shortName}</p>
          </div>
        ))}
        {data?.away?.players?.slice(0, 7)?.map((player, index) => (
          <div key={index} className={classes[classNames[index + 7]]}>
            <Image
              className={classes["team-shirt"]}
              src="/svg/watch/handball/yellow-player.svg"
              alt="helmet"
              width="37"
              height="35"
            />
            <p className={classes["player-name"]}>{player.player.shortName}</p>
          </div>
        ))}
      </div>

      <div className={classes["left"]}>
        <div className={classes["alternative-players"]}>
          {alternativePlayers?.secondTeam === 1
            ? secondTeamSubstitutePlayers?.slice(0, 7)?.map((player) => (
                <div key={player} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/handball/yellow-player.svg"
                    alt="helmet"
                    width="26"
                    height="33"
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))
            : secondTeamSubstitutePlayers?.slice(7)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/handball/yellow-player.svg"
                    alt="helmet"
                    width="26"
                    height="33"
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.shortName}
                  </p>
                </div>
              ))}
        </div>
        <MatchDots
          vertical={true}
          options={[1, 2]}
          selectedOption={alternativePlayers.secondTeam}
          changeOptions={changeSecondTeamOptions}
        />
      </div>
    </div>
  );
};

export default Staduim;
