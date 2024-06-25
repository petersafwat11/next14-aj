import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import AlternativePlayers from "./AlternativePlayers";
import classes from "./lineups.module.css";
import Staduim from "./Staduim";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Lineups = ({ data, firstTeamName, secondTeamName }) => {
  const changeCategory = (option) => {
    setOption(option);
  };
  const [option, setOption] = useState(1);
  const firstTeamAlternativePlayers = data
    ? data?.home?.players?.slice(6)
    : null;
  const secondTeamAlternativePlayers = data
    ? data?.away?.players?.slice(6)
    : null;
  return data !== null ? (
    <div className={classes["container"]}>
      <Staduim data={data} />
      <div className={classes["alternative-players"]}>
        <AlternativePlayers
          firstTeamAlternativePlayers={firstTeamAlternativePlayers}
          secondTeamSubstitutePlayers={secondTeamAlternativePlayers}
          option={option}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
        />
      </div>
      <div className={classes["mobile-dots"]}>
        <MatchDots
          options={[3, 4]}
          selectedOption={option}
          changeOptions={changeCategory}
        />
      </div>
    </div>
  ) : (
    <UnderDevelopment
      title={"Lineups will be available when live"}
      message={"Please share this link with friends and family until then"}
    />
  );
};

export default Lineups;
