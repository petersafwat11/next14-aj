import Image from "next/image";
import React, { useState } from "react";
import Details from "../details/Details";
import MatchDots from "../matchDots/MatchDots";
import Temprature from "../temprature/Temprature";
import classes from "./lineups.module.css";
import Staduim from "./Staduim";
const Lineups = ({ data }) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return (
    <div className={classes["container"]}>
      <Staduim />
      <div className={classes["racing-cars"]}>
        {data.players.map((car, index) => (
          <div key={index} className={classes["player"]}>
            {index == 1 || index == 5 || index == 7 || index == 11 ? (
              <Image
                className={classes["car-icon"]}
                src="/svg/watch/nascar/orange-car.svg"
                alt="car"
                width="75"
                height="33"
              />
            ) : index == 2 || index == 8 ? (
              <Image
                className={classes["car-icon"]}
                src="/svg/watch/nascar/blue-car.svg"
                alt="car"
                width="75"
                height="33"
              />
            ) : (
              <Image
                className={classes["car-icon"]}
                src="/svg/watch/nascar/red-car.svg"
                alt="car"
                width="75"
                height="33"
              />
            )}
            <p className={classes["player-name"]}>{car.name}</p>
          </div>
        ))}
      </div>
      <MatchDots
        options={[1, 2, 3, 4]}
        selectedOption={option}
        changeOptions={changeCategory}
      />

      <div className={classes["temp"]}>
        <Temprature />
      </div>

      <Details
        matchDetails={[
          { left: "VENUE", right: "O2 Arena" },
          { left: "LOCATION", right: "New Delhi, India" },
        ]}
      />
    </div>
  );
};

export default Lineups;
