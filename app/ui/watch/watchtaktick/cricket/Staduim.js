import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = ({ data, option }) => {
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

  let firstTeamHasRemovedB = false;
  let firstTeamHasRemovedWK = false;
  let secondTeamHasRemovedB = false;
  let secondTeamHasRemovedWK = false;

  // Filter the array
  let firstTeamfilteredArray = data?.home?.players
    ?.filter((player) => player.substitute === false)
    ?.filter((item) => {
      if (!firstTeamHasRemovedB && item.position === "B") {
        firstTeamHasRemovedB = true; // Set the flag to true after removing the first 'B' player
        return false; // Exclude the first 'B' player
      } else if (!firstTeamHasRemovedWK && item.position === "WK") {
        firstTeamHasRemovedWK = true; // Set the flag to true after removing the first 'WK' player
        return false; // Exclude the first 'WK' player
      }
      return true; // Include other players
    });
  let secondTeamfilteredArray = data?.away?.players
    ?.filter((player) => player.substitute === false)
    ?.filter((item) => {
      if (!secondTeamHasRemovedB && item.position === "B") {
        secondTeamHasRemovedB = true; // Set the flag to true after removing the first 'B' player
        return false; // Exclude the first 'B' player
      } else if (!secondTeamHasRemovedWK && item.position === "WK") {
        secondTeamHasRemovedWK = true; // Set the flag to true after removing the first 'WK' player
        return false; // Exclude the first 'WK' player
      }
      return true; // Include other players
    });

  console.log(
    "firstTeamOtherPlayer",
    firstTeamfilteredArray,
    secondTeamfilteredArray
  );
  return (
    <div className={classes["stadium"]}>
      {option === 1 ? (
        <>
          {firstTeamfilteredArray?.map((player, index) => (
            <div key={index} className={classes[classNames[index]]}>
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/cricket/player.svg"
                alt="player-icon"
                width="45"
                height="53"
              />
              <p className={classes["player-name"]}>
                {player.player.shortName}{" "}
              </p>
            </div>
          ))}
          <div className={classes[classNames[9]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/cricket/player.svg"
              alt="player-icon"
              width="45"
              height="53"
            />
            <p className={classes["player-name"]}>
              {
                data?.home?.players?.find((player) => player.position === "B")
                  .player.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[10]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/cricket/player.svg"
              alt="player-icon"
              width="45"
              height="53"
            />
            <p className={classes["player-name"]}>
              {
                data?.home?.players?.find((player) => player.position === "WK")
                  .player.shortName
              }{" "}
            </p>
          </div>
        </>
      ) : (
        <>
          {secondTeamfilteredArray?.map((player, index) => (
            <div key={index} className={classes[classNames[index]]}>
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/cricket/player.svg"
                alt="player-icon"
                width="45"
                height="53"
              />
              <p className={classes["player-name"]}>
                {player.player.shortName}
              </p>
            </div>
          ))}
          <div className={classes[classNames[9]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/cricket/player.svg"
              alt="player-icon"
              width="45"
              height="53"
            />
            <p className={classes["player-name"]}>
              {
                data?.away?.players?.find((player) => player.position === "B")
                  .player.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[10]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/cricket/player.svg"
              alt="player-icon"
              width="45"
              height="53"
            />
            <p className={classes["player-name"]}>
              {
                data?.away?.players?.find((player) => player.position === "WK")
                  .player.shortName
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Staduim;
