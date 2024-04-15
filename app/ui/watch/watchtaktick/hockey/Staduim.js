import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./staduim.module.css";
const Staduim = ({
  data,
  firstTeamAlternativePlayers,
  secondTeamAlternativePlayers,
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
    <div className={classes["wrapper"]}>
      <div className={classes["left"]}>
        <MatchDots
          vertical={true}
          options={[1, 2]}
          selectedOption={alternativePlayers.firstTeam}
          changeOptions={changeFirstTeamOptions}
        />

        <div className={classes["alternative-players"]}>
          {alternativePlayers.firstTeam === 1
            ? firstTeamAlternativePlayers?.slice(0, 7)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/hockey/blue-helmet.svg"
                    alt="helmet"
                    width="37"
                    height="35"
                  />
                  <p className={classes["alternative-player-name"]}>
                    {player.player.name}
                  </p>
                </div>
              ))
            : firstTeamAlternativePlayers?.slice(7)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/hockey/blue-helmet.svg"
                    alt="helmet"
                    width="37"
                    height="35"
                  />
                  <p className={classes["alternative-player-name"]}>
                    {player.player.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
      <div className={classes["stadium"]}>
        {data?.home?.players?.slice(0, 6)?.map((player, index) => (
          <div key={index} className={classes[classNames[index]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/hockey/pink-helmet.svg"
              alt="helmet"
              width="37"
              height="35"
            />
            <p className={classes["player-name"]}>{player.player.name}</p>
          </div>
        ))}{" "}
        {data?.away?.players?.slice(0, 6)?.map((player, index) => (
          <div key={index} className={classes[classNames[index + 6]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/hockey/blue-helmet.svg"
              alt="helmet"
              width="37"
              height="35"
            />
            <p className={classes["player-name"]}>{player.player.name}</p>
          </div>
        ))}
      </div>
      <div className={classes["right"]}>
        <div className={classes["alternative-players"]}>
          {alternativePlayers.secondTeam === 1
            ? secondTeamAlternativePlayers
                ?.slice(0, 7)
                ?.map((player, index) => (
                  <div key={index} className={classes["alternative-player"]}>
                    <Image
                      src="/svg/watch/hockey/blue-helmet.svg"
                      alt="helmet"
                      width="37"
                      height="35"
                    />
                    <p className={classes["alternative-player-name"]}>
                      {player.player.name}
                    </p>
                  </div>
                ))
            : secondTeamAlternativePlayers?.slice(7)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <Image
                    src="/svg/watch/hockey/blue-helmet.svg"
                    alt="helmet"
                    width="37"
                    height="35"
                  />
                  <p className={classes["alternative-player-name"]}>
                    {player.player.name}
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
