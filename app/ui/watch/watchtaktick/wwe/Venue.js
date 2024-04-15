import React, { useState } from "react";
import Details from "../details/Details";
import MatchDots from "../matchDots/MatchDots";
import Staduim from "./Staduim";
import classes from "./venue.module.css";
const Venue = ({data}) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return (
    <div className={classes["container"]}>
      <Staduim />
      <div className={classes["players"]}>
        {data.players.map((player, index) => (
          <p key={index} className={classes["player"]}>
            {player.name}
          </p>
        ))}
      </div>
      <MatchDots
        options={[1, 2]}
        selectedOption={option}
        changeOptions={changeCategory}
      />
      <div className={classes["details"]}>
        <Details
          matchDetails={[
            { left: "VENUE", right: "O2 Arena" },
            { left: "LOCATION", right: "New Delhi, India" },
          ]}
        />
      </div>
    </div>
  );
};

export default Venue;
