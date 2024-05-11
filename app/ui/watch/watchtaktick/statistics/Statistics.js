import React from "react";
import Body from "./Body";
import Bottom from "./Bottom";
import classes from "./statistics.module.css";
import Top from "./Top";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const Statistics = ({ data, firstTeamName, secondTeamName }) => {
  // console.log("data", data);
  // const [teamsName, setTeamsName] = useState([]);

  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   const getUniqueTeamNames = (events) => {
  //     const teamNamesSet = new Set();

  //     events.forEach((event) => {
  //       teamNamesSet.add(event.team.name);
  //     });

  //     return Array.from(teamNamesSet);
  //   };
  //   setTeamsName(getUniqueTeamNames(data));
  // }, [data]);

  return data !== null ? (
    <div className={classes["container"]}>
      <Top firstTeamName={firstTeamName} secondTeamName={secondTeamName} />
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        <Body data={data} />
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
