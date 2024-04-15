import React from "react";
import { FaTshirt } from "react-icons/fa";
import classes from "./playersLocations.module.css";

const PlayersLocations4222 = ({ data }) => {
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
  ];
  return (
    <>
      {data?.startXI?.map((player, index) => (
        <div key={index} className={classes[classNames[index]]}>
          <FaTshirt
            color={
              index === 0
                ? data.team.colors.goalkeeper.primary
                : data.team.colors.player.primary
            }
            className={classes["team-shirt"]}
          />
          <p className={classes["player-name"]}>{player.player.name}</p>
        </div>
      ))}
    </>
  );
};

export default PlayersLocations4222;
