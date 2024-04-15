import React, { useState } from "react";
import Details from "../details/Details";
import MatchDots from "../matchDots/MatchDots";
import Temprature from "../temprature/Temprature";
import classes from "./lineups.module.css";
import Staduim from "./Staduim";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Lineups = ({ data }) => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return data !== null ? (
    <div className={classes["container"]}>
      <Staduim data={data} option={option} />
      <div className={classes["temp"]}>
        <Temprature />
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
            { left: "TEAM", right: "Pakistan" },
          ]}
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
