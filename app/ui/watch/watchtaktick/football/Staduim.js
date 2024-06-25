import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import PlayersLocations3142 from "./plans/firstTeam/3-1-4-2/PlayersLocations3142";
import PlayersLocations3241 from "./plans/firstTeam/3-2-4-1/PlayersLocations3241";
import PlayersLocations3412 from "./plans/firstTeam/3-4-1-2/PlayersLocations3412";
import PlayersLocations3421 from "./plans/firstTeam/3-4-2-1/PlayersLocations3421";
import PlayersLocations343 from "./plans/firstTeam/3-4-3/PlayersLocations343";
import PlayersLocations3511 from "./plans/firstTeam/3-5-1-1/PlayersLocations3511";
import PlayersLocations352 from "./plans/firstTeam/3-5-2/PlayersLocations352";
import PlayersLocations41212 from "./plans/firstTeam/4-1-2-1-2/PlayersLocations41212";
import PlayersLocations4132 from "./plans/firstTeam/4-1-3-2/PlayersLocations4132";
import PlayersLocations4141 from "./plans/firstTeam/4-1-4-1/PlayersLocations4141";
import PlayersLocations4222 from "./plans/firstTeam/4-2-2-2/PlayersLocations4222";
import PlayersLocations4231 from "./plans/firstTeam/4-2-3-1/PlayersLocations4231";
import PlayersLocations4312 from "./plans/firstTeam/4-3-1-2/PlayersLocations4312";
import PlayersLocations4321 from "./plans/firstTeam/4-3-2-1/PlayersLocations4231";
import PlayersLocations433 from "./plans/firstTeam/4-3-3/PlayersLocations433";
import PlayersLocations4411 from "./plans/firstTeam/4-4-1-1/PlayersLocations4411";
import PlayersLocations442 from "./plans/firstTeam/4-4-2/PlayersLocations442";
import PlayersLocations451 from "./plans/firstTeam/4-5-1/PlayersLocations451";
import PlayersLocations5212 from "./plans/firstTeam/5-2-1-2/PlayersLocations5212";
import PlayersLocations523 from "./plans/firstTeam/5-2-3/PlayersLocations451";
import PlayersLocations532 from "./plans/firstTeam/5-3-2/PlayersLocations451";
import PlayersLocations541 from "./plans/firstTeam/5-4-1/PlayersLocations5212";
import { default as PlayersLocations3142Second } from "./plans/secondTeam/3-1-4-2/PlayersLocations3142";
import { default as PlayersLocations3241Second } from "./plans/secondTeam/3-2-4-1/PlayersLocations3241";
import { default as PlayersLocations3412Second } from "./plans/secondTeam/3-4-1-2/PlayersLocations3412";
import { default as PlayersLocations3421Second } from "./plans/secondTeam/3-4-2-1/PlayersLocations3421";
import { default as PlayersLocations343Second } from "./plans/secondTeam/3-4-3/PlayersLocations343";
import { default as PlayersLocations3511Second } from "./plans/secondTeam/3-5-1-1/PlayersLocations3511";
import { default as PlayersLocations352Second } from "./plans/secondTeam/3-5-2/PlayersLocations352";
import { default as PlayersLocations41212Second } from "./plans/secondTeam/4-1-2-1-2/PlayersLocations41212";
import { default as PlayersLocations4132Second } from "./plans/secondTeam/4-1-3-2/PlayersLocations4132";
import { default as PlayersLocations4141Second } from "./plans/secondTeam/4-1-4-1/PlayersLocations4141";
import { default as PlayersLocations4222Second } from "./plans/secondTeam/4-2-2-2/PlayersLocations4222";
import { default as PlayersLocations4231Second } from "./plans/secondTeam/4-2-3-1/PlayersLocations4231";
import { default as PlayersLocations4312Second } from "./plans/secondTeam/4-3-1-2/PlayersLocations4312";
import { default as PlayersLocations4321Second } from "./plans/secondTeam/4-3-2-1/PlayersLocations4321";
import { default as PlayersLocations433Second } from "./plans/secondTeam/4-3-3/PlayersLocations433";
import { default as PlayersLocations4411Second } from "./plans/secondTeam/4-4-1-1/PlayersLocations4411";
import { default as PlayersLocations442Second } from "./plans/secondTeam/4-4-2/PlayersLocations442";
import { default as PlayersLocations451Second } from "./plans/secondTeam/4-5-1/PlayersLocations451";
import { default as PlayersLocations5212Second } from "./plans/secondTeam/5-2-1-2/PlayersLocations5212";
import { default as PlayersLocations523Second } from "./plans/secondTeam/5-2-3/PlayersLocations451";
import { default as PlayersLocations532Second } from "./plans/secondTeam/5-3-2/PlayersLocations451";
import { default as PlayersLocations541Second } from "./plans/secondTeam/5-4-1/PlayersLocations5212";

import classes from "./staduim.module.css";
import { FaTshirt } from "react-icons/fa";

const Staduim = ({ data }) => {
  const firstTeamPlan = data[0]?.formation;
  const secondTeamPlan = data[1]?.formation;
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
            ? data[0]?.substitutes?.slice(0, 6)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <FaTshirt
                    color={data[0].team.colors.player.primary}
                    className={classes["team-shirt"]}
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.name}
                  </p>
                </div>
              ))
            : data[0]?.substitutes?.slice(6)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <FaTshirt
                    color={data[0].team.colors.player.primary}
                    className={classes["team-shirt"]}
                  />

                  <p className={classes["alternative-player-name"]}>
                    {player.player.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
      <div className={classes["stadium-wrapper"]}>
        <div className={classes["stadium"]}>
          {firstTeamPlan === "3-2-4-1" ? (
            <PlayersLocations3241 data={data[0]} />
          ) : firstTeamPlan === "3-4-3" ? (
            <PlayersLocations343 data={data[0]} />
          ) : firstTeamPlan === "4-1-2-1-2" ? (
            <PlayersLocations41212 data={data[0]} />
          ) : firstTeamPlan === "4-3-3" ? (
            <PlayersLocations433 data={data[0]} />
          ) : firstTeamPlan === "4-4-2" ? (
            <PlayersLocations442 data={data[0]} />
          ) : firstTeamPlan === "4-5-1" ? (
            <PlayersLocations451 data={data[0]} />
          ) : firstTeamPlan === "5-2-1-2" ? (
            <PlayersLocations5212 data={data[0]} />
          ) : firstTeamPlan === "5-2-3" ? (
            <PlayersLocations523 data={data[0]} />
          ) : firstTeamPlan === "5-3-2" ? (
            <PlayersLocations532 data={data[0]} />
          ) : firstTeamPlan === "5-4-1" ? (
            <PlayersLocations541 data={data[0]} />
          ) : firstTeamPlan === "4-2-3-1" ? (
            <PlayersLocations4231 data={data[0]} />
          ) : firstTeamPlan === "3-1-4-2" ? (
            <PlayersLocations3142 data={data[0]} />
          ) : firstTeamPlan === "3-4-1-2" ? (
            <PlayersLocations3412 data={data[0]} />
          ) : firstTeamPlan === "3-4-2-1" ? (
            <PlayersLocations3421 data={data[0]} />
          ) : firstTeamPlan === "3-5-1-1" ? (
            <PlayersLocations3511 data={data[0]} />
          ) : firstTeamPlan === "4-2-2-2" ? (
            <PlayersLocations4222 data={data[0]} />
          ) : firstTeamPlan === "4-1-4-1" ? (
            <PlayersLocations4141 data={data[0]} />
          ) : firstTeamPlan === "4-1-3-2" ? (
            <PlayersLocations4132 data={data[0]} />
          ) : firstTeamPlan === "3-5-2" ? (
            <PlayersLocations352 data={data[0]} />
          ) : firstTeamPlan === "4-4-1-1" ? (
            <PlayersLocations4411 data={data[0]} />
          ) : firstTeamPlan === "4-3-2-1" ? (
            <PlayersLocations4321 data={data[0]} />
          ) : firstTeamPlan === "4-3-1-2" ? (
            <PlayersLocations4312 data={data[0]} />
          ) : (
            ""
          )}
          {secondTeamPlan === "3-2-4-1" ? (
            <PlayersLocations3241Second data={data[1]} />
          ) : firstTeamPlan === "3-4-3" ? (
            <PlayersLocations343Second data={data[1]} />
          ) : firstTeamPlan === "4-1-2-1-2" ? (
            <PlayersLocations41212Second data={data[1]} />
          ) : firstTeamPlan === "4-3-3" ? (
            <PlayersLocations433Second data={data[1]} />
          ) : firstTeamPlan === "4-4-2" ? (
            <PlayersLocations442Second data={data[1]} />
          ) : firstTeamPlan === "4-5-1" ? (
            <PlayersLocations451Second data={data[1]} />
          ) : firstTeamPlan === "5-2-1-2" ? (
            <PlayersLocations5212Second data={data[1]} />
          ) : firstTeamPlan === "5-2-3" ? (
            <PlayersLocations523Second data={data[1]} />
          ) : firstTeamPlan === "5-3-2" ? (
            <PlayersLocations532Second data={data[1]} />
          ) : firstTeamPlan === "5-4-1" ? (
            <PlayersLocations541Second data={data[1]} />
          ) : firstTeamPlan === "4-2-3-1" ? (
            <PlayersLocations4231Second data={data[1]} />
          ) : firstTeamPlan === "4-3-2-1" ? (
            <PlayersLocations4321Second data={data[1]} />
          ) : firstTeamPlan === "4-3-1-2" ? (
            <PlayersLocations4312Second data={data[1]} />
          ) : firstTeamPlan === "4-2-2-2" ? (
            <PlayersLocations4222Second data={data[1]} />
          ) : firstTeamPlan === "4-1-3-2" ? (
            <PlayersLocations4132Second data={data[1]} />
          ) : firstTeamPlan === "3-5-2" ? (
            <PlayersLocations352Second data={data[1]} />
          ) : firstTeamPlan === "4-1-4-1" ? (
            <PlayersLocations4141Second data={data[1]} />
          ) : firstTeamPlan === "3-5-1-1" ? (
            <PlayersLocations3511Second data={data[1]} />
          ) : firstTeamPlan === "3-4-2-1" ? (
            <PlayersLocations3421Second data={data[1]} />
          ) : firstTeamPlan === "3-4-1-2" ? (
            <PlayersLocations3412Second data={data[1]} />
          ) : firstTeamPlan === "3-1-4-2" ? (
            <PlayersLocations3142Second data={data[1]} />
          ) : firstTeamPlan === "4-4-1-1" ? (
            <PlayersLocations4411Second data={data[1]} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={classes["left"]}>
        <div className={classes["alternative-players"]}>
          {alternativePlayers.secondTeam === 1
            ? data[1]?.substitutes?.slice(0, 6)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <FaTshirt
                    color={data[1].team.colors.player.primary}
                    className={classes["team-shirt"]}
                  />

                  <p className={classes["alternative-player-name"]}>
                    {" "}
                    {player.player.name}
                  </p>
                </div>
              ))
            : data[1]?.substitutes?.slice(6)?.map((player, index) => (
                <div key={index} className={classes["alternative-player"]}>
                  <FaTshirt
                    color={data[1].team.colors.player.primary}
                    className={classes["team-shirt"]}
                  />

                  <p className={classes["alternative-player-name"]}>
                    {" "}
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
