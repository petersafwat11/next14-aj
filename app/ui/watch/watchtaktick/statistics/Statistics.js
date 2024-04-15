import React from "react";
import Body from "./Body";
import Bottom from "./Bottom";
import classes from "./statistics.module.css";
import Top from "./Top";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Statistics = ({ optionsOne, data, firstTeamName, secondTeamName }) => {
  console.log("data", data);
  return data !== null ? (
    <div className={classes["container"]}>
      <Top firstTeamName={firstTeamName} secondTeamName={secondTeamName} />
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <Body options={optionsOne} data={data} />
      </div>
      <span className={classes["devider"]}></span>

      <Bottom />
    </div>
  ) : (
    <UnderDevelopment
      title={"Stats will be available when live"}
      message={"Please share this link with friends and family until then"}
    />
  );
};

export default Statistics;
