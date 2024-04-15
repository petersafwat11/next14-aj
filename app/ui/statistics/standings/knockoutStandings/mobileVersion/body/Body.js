import Image from "next/image";
import React from "react";
import Group from "../group/Group";
import classes from "./body.module.css";
const Body = () => {
  return (
    <div className={classes["container"]}>
      <Image
        className={classes["small-connection-1"]}
        src="/svg/statistics/mobile-rounds-connection-8.svg"
        alt="team"
        width="160"
        height="80"
      />
      <Image
        className={classes["small-connection-2"]}
        src="/svg/statistics/mobile-rounds-connection-8.svg"
        alt="team"
        width="160"
        height="80"
      />
      <Image
        className={classes["small-connection-3"]}
        src="/svg/statistics/mobile-rounds-connection-8.svg"
        alt="team"
        width="160"
        height="80"
      />
      <Image
        className={classes["small-connection-4"]}
        src="/svg/statistics/mobile-rounds-connection-8.svg"
        alt="team"
        width="160"
        height="80"
      />
      <Image
        className={classes["large-connection-1"]}
        src="/svg/statistics/mobile-rounds-connection-4.svg"
        alt="team"
        width="329"
        height="89"
      />
      <Image
        className={classes["large-connection-2"]}
        src="/svg/statistics/mobile-rounds-connection-4.svg"
        alt="team"
        width="329"
        height="89"
      />

      <div className={classes["round-8"]}>
        <div className={classes["groups-wrapper"]}>
          <Group />
          <Group />
        </div>
        <div className={classes["groups-wrapper"]}>
          <Group />
          <Group />
        </div>
      </div>
      <div className={classes["round-4"]}>
        <Group />
        <Group />
      </div>
      <div className={classes["round-1"]}>
        <Group final={true} />
      </div>
      <div className={classes["round-4"]}>
        <Group />
        <Group />
      </div>
      <div className={classes["round-8"]}>
        <div className={classes["groups-wrapper"]}>
          <Group />
          <Group />
        </div>
        <div className={classes["groups-wrapper"]}>
          <Group />
          <Group />
        </div>
      </div>
    </div>
  );
};

export default Body;
