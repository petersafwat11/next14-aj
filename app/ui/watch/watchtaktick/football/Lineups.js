import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import AlternativePlayers from "./AlternativePlayers";
import classes from "./lineups.module.css";
import Plan from "./lineups/plan/Plan";
import Staduim from "./Staduim";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Lineups = ({ data, firstTeamName, secondTeamName }) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };
  const firstTeamSubstitutePlayers = data ? data[0]?.substitutes : null;
  const secondTeamSubstitutePlayers = data ? data[1]?.substitutes : null;
  return data !== null ? (
    <div className={classes["container"]}>
      <div className={classes["stad"]}>
        <Plan top={true} plan={data[0]?.formation} />
        <span className={classes["devider"]}></span>
        <Staduim data={data} />
        <span className={classes["devider"]}></span>

        <Plan plan={data[1]?.formation} />
      </div>
      <div className={classes["alternative-players"]}>
        <AlternativePlayers
          firstTeamSubstitutePlayers={firstTeamSubstitutePlayers}
          secondTeamSubstitutePlayers={secondTeamSubstitutePlayers}
          option={option}
          firstTeamName={firstTeamName}
          secondTeamName={secondTeamName}
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
  ) : (
    <UnderDevelopment
      title={"Lineups will be available when live"}
      message={"Please share this link with friends and family until then"}
    />
  );
};

export default Lineups;
