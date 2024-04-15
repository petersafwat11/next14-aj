import Image from "next/image";
import React from "react";
import classes from "./body.module.css";
import Event from "./event/Event";
const Body = ({ data, eventStadium, firstTeamName, secondTeamName }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <div className={classes["left"]}>
          <Image
            className={classes["man-icon"]}
            src="/svg/watch/football/icon-left.svg"
            alt="stadium"
            width="21"
            height="29"
          />

          <p>Howard Webb</p>
        </div>
        <div className={classes["right"]}>
          <Image
            className={classes["arrow-up"]}
            src="/svg/watch/football/icon-right.svg"
            alt=" "
            width="28"
            height="21"
          />

          <p>{eventStadium}</p>
        </div>
      </div>
      <span className={classes["seperator"]}> </span>
      <div className={classes["content"]}>
        <Image
          className={classes["watch-icon"]}
          src="/svg/watch/football/stopwatch.svg"
          alt="watch"
          width="33"
          height="30"
        />
        <span className={classes["devider"]}></span>
        <div className={classes["events"]}>
          {data.map((event, index) => (
            <Event
              key={index}
              detail={event.detail}
              type={event.type}
              team={event.team == firstTeamName ? "first team" : "second team"}
              time={event.time.elapsed}
              player={event.player.name}
              assist={event.assist.name}
            />
          ))}
          {/* <Event eventType={"goal"} team={"first team"} />
          <Event eventType={"red card"} team={"first team"} />
          <Event eventType={"yellow card"} team={"second team"} />
          <Event eventType={"substitute"} team={"second team"} />
          <Event eventType={"penalty"} team={"second team"} />
          <Event eventType={"var"} team={"second team"} />
          <Event eventType={"own goal"} team={"second team"} />
          <Event eventType={"goal"} team={"first team"} />
          <Event eventType={"red card"} team={"first team"} />
          <Event eventType={"yellow card"} team={"second team"} />
          <Event eventType={"substitute"} team={"second team"} />
          <Event eventType={"penalty"} team={"second team"} />
          <Event eventType={"var"} team={"second team"} />
          <Event eventType={"own goal"} team={"second team"} /> */}
        </div>
        <Image
          className={classes["whistle-icon"]}
          src="/svg/watch/football/whistle.svg"
          alt="whistle"
          width="40"
          height="40"
        />
      </div>
    </div>
  );
};

export default Body;
