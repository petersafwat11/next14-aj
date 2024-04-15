import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = ({ data }) => {
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
  return (
    <div className={classes["stadium"]}>
      {data.firstTeam.map((player, index) => (
        <div key={index} className={classes[classNames[index]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/netball/red-player.svg"
            alt="helmet"
            width="37"
            height="35"
          />
          {/* <Image
              className={classes["team-shirt"]}
              src="/svg/watch/netball/blue-player.svg"
              alt="helmet"
              width="37"
              height="35"
            /> */}
          <p className={classes["player-name"]}>{player.name}</p>
        </div>
      ))}
      {data.secondTeam.map((player, index) => (
        <div key={index} className={classes[classNames[index + 7]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/netball/blue-player.svg"
            alt="helmet"
            width="37"
            height="35"
          />
          <p className={classes["player-name"]}>{player.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Staduim;
