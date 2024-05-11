import React, { useEffect, useState } from "react";
import Body from "./body/Body";
import Bottom from "./bottom/Bottom";
import classes from "./events.module.css";
import Top from "./top/Top";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Events = ({ firstTeamName, secondTeamName, data, eventStadium }) => {
  const [teamsName, setTeamsName] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const getUniqueTeamNames = (events) => {
      const teamNamesSet = new Set();

      events.forEach((event) => {
        teamNamesSet.add(event.team.name);
      });

      return Array.from(teamNamesSet);
    };
    setTeamsName(getUniqueTeamNames(data));
  }, [data]);
  return data !== null ? (
    <div className={classes["container"]}>
      <Top
        firstTeamName={teamsName[0] || firstTeamName}
        secondTeamName={teamsName[1] || secondTeamName}
      />
      <span className={classes["devider"]}></span>
      <Body
        firstTeamName={teamsName[0] || firstTeamName}
        secondTeamName={teamsName[1] || secondTeamName}
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
