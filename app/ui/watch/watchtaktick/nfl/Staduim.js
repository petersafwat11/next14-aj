import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./staduim.module.css";

const Staduim = () => {
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
      <div className={classes["left"]}>
        <MatchDots
          vertical={true}
          options={[1, 2]}
          selectedOption={alternativePlayers.firstTeam}
          changeOptions={changeFirstTeamOptions}
        />
        <div className={classes["alternative-players"]}>
          {[1, 2, 3, 4, 5, 6].map((player) => (
            <div key={player} className={classes["alternative-player"]}>
              <Image
                src="/svg/watch/nfl/player-icon-1.svg"
                alt="helmet"
                width="26"
                height="33"
              />

              <p className={classes["alternative-player-name"]}>M. Jordan</p>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["stadium"]}>
        {[
          "one",
          "two",
          "three",
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
          "fivteen",
          "sixteen",
          "seventeen",
          "eighteen",
          "nineteen",
          "twenty",
          "twenty-one",
          "twenty-two",
        ].map((item, index) => (
          <div key={index} className={classes[item]}>
            {index < 12 ? (
              <Image
                className={classes["team-shirt"]}
                src="/svg/watch/nfl/player-icon-1.svg"
                alt="helmet"
                width="30"
                height="36"
              />
            ) : (
              <Image
                className={classes["team-shirt"]}
                src="/svg/watch/nfl/player-icon-2.svg"
                alt="helmet"
                width="30"
                height="36"
              />
            )}
            <p className={classes["player-name"]}>Lorem</p>
          </div>
        ))}
      </div>

      <div className={classes["right"]}>
        <div className={classes["alternative-players"]}>
          {[7, 8, 9, 10, 11, 12].map((player) => (
            <div key={player} className={classes["alternative-player"]}>
              <Image
                src="/svg/watch/nfl/player-icon-2.svg"
                alt="helmet"
                width="26"
                height="33"
              />

              <p className={classes["alternative-player-name"]}>M. Jordan</p>
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
