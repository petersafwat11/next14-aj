import Image from "next/image";
import React from "react";
import classes from "./event.module.css";
const Event = ({ type, detail, team, time, player, assist }) => {
  return (
    <div
      className={
        team === "first team"
          ? classes["container"]
          : classes["container-reverse"]
      }
    >
      <div
        className={
          team === "first team" ? classes["event"] : classes["event-reverse"]
        }
      >
        {detail === "Yellow Card" ? (
          <Image
            className={classes["yellow-card"]}
            src="/svg/watch/football/yellow-card.svg"
            alt="yellow card"
            width="23"
            height="33"
          />
        ) : detail === "Red Card" ? (
          <Image
            className={classes["red-card"]}
            src="/svg/watch/football/red-card.svg"
            alt="red card"
            width="23"
            height="33"
          />
        ) : type === "Var" ? (
          <Image
            className={classes["var"]}
            src="/svg/watch/football/var.svg"
            alt="var"
            width="30"
            height="34"
          />
        ) : type === "subst" ? (
          <Image
            className={classes["substitute"]}
            src="/svg/watch/football/substitute.svg"
            alt="substitute"
            width="21"
            height="26"
          />
        ) : detail === "Normal Goal" ? (
          <Image
            className={classes["goal"]}
            src="/svg/watch/football/goal.svg"
            alt="goal"
            width="27"
            height="27"
          />
        ) : detail === "Penalty" ? (
          <Image
            className={classes["penalty"]}
            src="/svg/watch/football/penalty.svg"
            alt="penalty"
            width="27"
            height="27"
          />
        ) : detail === "Own Goal" ? (
          <Image
            className={classes["own-goal"]}
            src="/svg/watch/football/own-goal.svg"
            alt="own goal"
            width="27"
            height="27"
          />
        ) : (
          <Image
            className={classes["own-goal"]}
            src="/svg/watch/football/own-goal.svg"
            alt="own goal"
            width="27"
            height="27"
          />
        )}

        {type !== "subst" ? (
          <p className={classes["player-name"]}>{player}</p>
        ) : (
          <div>
            <p className={classes["player-in"]}>{player}</p>
            <p className={classes["player-out"]}>{assist}</p>
          </div>
        )}
      </div>

      <div
        className={
          team === "first team" ? classes["time"] : classes["time-reverse"]
        }
      >
        <p className={classes["min"]}> {`${time}’`}</p>
      </div>
    </div>
  );
};

export default Event;
