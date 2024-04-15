import React, { useState } from "react";
import MatchDots from "../../../watchtaktick/matchDots/MatchDots";
import classes from "./champStandings.module.css";
import StandingsGroup from "./standingsGroup/StandingsGroup";
const ChampStandings = ({ data }) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return (
    <div className={classes["container"]}>
      {option === 1
        ? data.slice(0, 4).map((groupData, index) => (
            <div className={classes["group-wrapper"]} key={index}>
              <StandingsGroup groupData={groupData} />
              {index !== 3 && <span className={classes["devider"]}></span>}
            </div>
          ))
        : data.slice(4, 8).map((groupData, index) => (
            <div className={classes["group-wrapper"]} key={index}>
              <StandingsGroup groupData={groupData} />
              {index !== 3 && <span className={classes["devider"]}></span>}
            </div>
          ))}
      <div className={classes["switch-dots"]}>
        <MatchDots
          options={[1, 2]}
          selectedOption={option}
          changeOptions={changeCategory}
        />
      </div>
    </div>
  );
};

export default ChampStandings;
