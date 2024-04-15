import Image from "next/image";
import React from "react";
import classes from "./mainEvent.module.css";
const MainEvent = ({ data }) => {
  return (
    <div className={classes["main-event"]}>
      <Image
        className={classes["logo"]}
        src="/svg/watch/ufc/logo.svg"
        alt="logo"
        width="95"
        height="39"
      />
      <p className={classes["title"]}>UFC 229</p>
      <div className={classes["main-event-header"]}>
        <p className={classes["player-name"]}>{data.players[0].name}</p>
        <p className={classes["player-name"]}>{data.players[1].name}</p>
      </div>
      <div className={classes["main-event-stats"]}>
        {["age", "height", "weight", "reach", "record"].map((item, index) => (
          <div
            className={classes["stat-item"]}
            key={Math.random() * 10 + index}
          >
            <p>{data.players[0][item]}</p>
            <p className={classes["stat-item-middle"]}>{item} </p>
            <p>{data.players[1][item]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainEvent;
