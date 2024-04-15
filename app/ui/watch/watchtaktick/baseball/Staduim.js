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
  ];
  const firstTeamPlayingPlayers = data?.home?.players?.filter(
    (player) => player.substitute === false
  );
  const secondTeamPlayingPlayers = data?.away?.players?.filter(
    (player) => player.substitute === false
  );
  const firstTeamPlayers =
    firstTeamPlayingPlayers?.length === 9
      ? [...firstTeamPlayingPlayers]
      : data?.home?.players;
  const secondTeamPlayers =
    secondTeamPlayingPlayers?.length === 9
      ? [...secondTeamPlayingPlayers]
      : data?.away?.players;

  return (
    <div className={classes["stadium"]}>
      {option === 1 ? (
        <>
          <div className={classes[classNames[0]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "CF")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[1]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {" "}
              {firstTeamPlayers?.find((player) => player.position === "LF")
                ?.player?.shortName ||
                firstTeamPlayers?.filter(
                  (player) => player.position === "RF"
                )[1]?.player?.shortName}{" "}
            </p>
          </div>
          <div className={classes[classNames[2]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {firstTeamPlayers?.find((player) => player.position === "RF")
                ?.player?.shortName ||
                firstTeamPlayers?.filter(
                  (player) => player.position === "LF"
                )[1]?.player?.shortName}
            </p>
          </div>
          <div className={classes[classNames[3]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "SS")
                  ?.player?.shortName
              }{" "}
            </p>
          </div>
          <div className={classes[classNames[4]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "2B")
                  ?.player?.shortName
              }{" "}
            </p>
          </div>
          <div className={classes[classNames[5]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "3B")
                  ?.player?.shortName
              }{" "}
            </p>
          </div>
          <div className={classes[classNames[6]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "P")
                  ?.player?.shortName
              }{" "}
            </p>
          </div>
          <div className={classes[classNames[7]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "1B")
                  ?.player?.shortName
              }{" "}
            </p>
          </div>
          <div className={classes[classNames[8]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                firstTeamPlayers?.find((player) => player.position === "C")
                  ?.player?.shortName
              }
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={classes[classNames[0]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "CF")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[1]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {secondTeamPlayers?.find((player) => player.position === "LF")
                .player.shortName ||
                secondTeamPlayers?.filter(
                  (player) => player.position === "RF"
                )[1]?.player?.shortName}
            </p>
          </div>
          <div className={classes[classNames[2]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {secondTeamPlayers?.find((player) => player.position === "RF")
                ?.player?.shortName ||
                secondTeamPlayers?.filter(
                  (player) => player.position === "LF"
                )[1]?.player?.shortName}
            </p>
          </div>
          <div className={classes[classNames[3]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "SS")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[4]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "2B")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[5]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "3B")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[6]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "P")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[7]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "1B")
                  ?.player?.shortName
              }
            </p>
          </div>
          <div className={classes[classNames[8]]}>
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/baseball/player.svg"
              alt="player-icon"
              width="41"
              height="45"
            />
            <p className={classes["player-name"]}>
              {
                secondTeamPlayers?.find((player) => player.position === "C")
                  ?.player?.shortName
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Staduim;
