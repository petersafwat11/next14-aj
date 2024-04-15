import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./staduim.module.css";

const Staduim = ({ data, awaySubstitutePlayers, homeSubstitutePlayers }) => {
  const homePlayingPlayers =
    data?.home?.players?.filter((player) => player.substitute === false) || [];
  const awayPlayingPlayers =
    data?.away?.players?.filter((player) => player.substitute === false) || [];

  const [alternativePlayers, setAlternativePlayers] = useState({
    firstTeam: 1,
    secondTeam: 1,
  });
  const playersClassNames = [
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
  ];
  console.log("away", homePlayingPlayers);
  console.log("home", awayPlayingPlayers);
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
        {homeSubstitutePlayers.length > 5 && (
          <MatchDots
            vertical={true}
            options={[1, 2]}
            selectedOption={alternativePlayers.firstTeam}
            changeOptions={changeFirstTeamOptions}
          />
        )}
        <div className={classes["alternative-players"]}>
          {homeSubstitutePlayers.map((player, index) => (
            <div
              key={index + player.player.shortNames}
              className={classes["alternative-player"]}
            >
              <Image
                src="/svg/watch/basketball/player-icon-1.svg"
                alt="helmet"
                width="24"
                height="28"
              />

              <p className={classes["alternative-player-name"]}>
                {player.player.shortName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={classes["stadium"]}>
        <div className={classes[playersClassNames[0]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {
              homePlayingPlayers?.find((player) => player.position === "F")
                ?.player?.shortName
            }
          </p>
        </div>
        <div className={classes[playersClassNames[1]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {
              homePlayingPlayers?.find((player) => player.position === "FC")
                ?.player?.shortName
            }
          </p>
        </div>
        <div className={classes[playersClassNames[2]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {
              homePlayingPlayers?.find((player) => player.position === "GF")
                ?.player?.shortName
            }
          </p>
        </div>
        <div className={classes[playersClassNames[3]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {
              homePlayingPlayers?.find((player) => player.position === "G")
                ?.player?.shortName
            }
          </p>
        </div>
        <div className={classes[playersClassNames[4]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {
              homePlayingPlayers?.find((player) => player.position === "SG")
                ?.player?.shortName
            }
          </p>
        </div>
        <div className={classes[playersClassNames[5]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {awayPlayingPlayers[0]?.player?.shortName}
          </p>
        </div>
        <div className={classes[playersClassNames[6]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {awayPlayingPlayers[1]?.player?.shortName}
          </p>
        </div>
        <div className={classes[playersClassNames[7]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {awayPlayingPlayers[2]?.player?.shortName}
          </p>
        </div>
        <div className={classes[playersClassNames[8]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {awayPlayingPlayers[3]?.player?.shortName}
          </p>
        </div>
        <div className={classes[playersClassNames[9]]}>
          <Image
            className={classes["team-shirt"]}
            src="/svg/watch/basketball/player-icon-1.svg"
            alt="helmet"
            width="33"
            height="38"
          />
          <p className={classes["player-name"]}>
            {awayPlayingPlayers[4]?.player?.shortName}
          </p>
        </div>
      </div>

      <div className={classes["right"]}>
        <div className={classes["alternative-players"]}>
          {awaySubstitutePlayers.map((player, index) => (
            <div
              key={index + player.player.shortName}
              className={classes["alternative-player"]}
            >
              <Image
                src="/svg/watch/basketball/player-icon-2.svg"
                alt="helmet"
                width="24"
                height="28"
              />

              <p className={classes["alternative-player-name"]}>
                {player.player.shortName}
              </p>
            </div>
          ))}
        </div>
        {awaySubstitutePlayers.length > 5 && (
          <MatchDots
            vertical={true}
            options={[1, 2]}
            selectedOption={alternativePlayers.secondTeam}
            changeOptions={changeSecondTeamOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Staduim;
