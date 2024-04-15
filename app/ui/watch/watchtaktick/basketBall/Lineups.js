import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import AlternativePlayers from "./AlternativePlayers";
import classes from "./lineups.module.css";
import Staduim from "./Staduim";
const Lineups = ({ data }) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };
  console.log("data", data);
  const awaySubstitutePlayers =
    data?.away?.players?.filter((player) => player.substitute === true) || [];
  const homeSubstitutePlayers =
    data?.home?.players?.filter((player) => player.substitute === true) || [];

  return (
    <div className={classes["container"]}>
      <Staduim
        data={data}
        awaySubstitutePlayers={awaySubstitutePlayers}
        homeSubstitutePlayers={homeSubstitutePlayers}
      />
      <div className={classes["alternative-players"]}>
        <AlternativePlayers
          awaySubstitutePlayers={awaySubstitutePlayers}
          homeSubstitutePlayers={homeSubstitutePlayers}
          selectedOption={option}
        />
      </div>
      <div className={classes["match-details-option-controller"]}>
        <MatchDots
          options={[1, 2]}
          selectedOption={option}
          changeOptions={changeCategory}
        />
      </div>
    </div>
  );
};

export default Lineups;
