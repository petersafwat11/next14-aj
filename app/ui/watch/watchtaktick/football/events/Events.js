import React from "react";
import Body from "./body/Body";
import Bottom from "./bottom/Bottom";
import classes from "./events.module.css";
import Top from "./top/Top";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Events = ({ firstTeamName, secondTeamName, data, eventStadium }) => {
  return data !== null ? (
    <div className={classes["container"]}>
      <Top firstTeamName={firstTeamName} secondTeamName={secondTeamName} />
      <span className={classes["devider"]}></span>
      <Body
        firstTeamName={firstTeamName}
        secondTeamName={secondTeamName}
        data={data}
        eventStadium={eventStadium}
      />
      <span className={classes["devider"]}></span>
      <Bottom />
    </div>
  ) : (
    <UnderDevelopment
      title={"Events will be available when live"}
      message={"Please share this link with friends and family until then"}
    />
  );
};

export default Events;
