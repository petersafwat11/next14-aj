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
  ];
  return (
    <div className={classes["stadium"]}>
      {data.firstTeam.players.map((player, index) =>
        player.gender !== "Male" < 4 ? (
          <div key={index} className={classes[classNames[index]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/vollayball/red-player.svg"
              alt="player-icon"
              width="44"
              height="65"
            />
            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        ) : (
          <div key={index} className={classes[classNames[index]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/vollayball/blue-player.svg"
              alt="player-icon"
              width="44"
              height="65"
            />
            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        )
      )}
      {data.secondTeam.players.map((player, index) =>
        player.gender !== "Male" < 4 ? (
          <div key={index} className={classes[classNames[index + 4]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/vollayball/red-player.svg"
              alt="player-icon"
              width="44"
              height="65"
            />
            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        ) : (
          <div key={index} className={classes[classNames[index]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/vollayball/blue-player.svg"
              alt="player-icon"
              width="44"
              height="65"
            />
            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        )
      )}
    </div>
  );
};

export default Staduim;
