import Image from "next/image";
import React from "react";
import Group from "../group/Group";
import classes from "./body.module.css";
const Body = () => {
  return (
    <div className={classes["container"]}>
      <Image
        className={classes["connection-round8-1"]}
        src="/svg/statistics/rounds-connection-8.svg"
        alt="team"
        width="42"
        height="130"
      />
      <Image
        className={classes["connection-round8-2"]}
        src="/svg/statistics/rounds-connection-8.svg"
        alt="team"
        width="42"
        height="130"
      />
      <Image
        className={classes["connection-round8-3"]}
        src="/svg/statistics/rounds-connection-8.svg"
        alt="team"
        width="42"
        height="130"
      />
      <Image
        className={classes["connection-round8-4"]}
        src="/svg/statistics/rounds-connection-8.svg"
        alt="team"
        width="42"
        height="130"
      />

      <Image
        className={classes["connection-round4-1"]}
        src="/svg/statistics/rounds-connection-4.svg"
        alt="team"
        width="42"
        height="360"
      />
      <Image
        className={classes["connection-round4-2"]}
        src="/svg/statistics/rounds-connection-4.svg"
        alt="team"
        width="42"
        height="360"
      />
      <Image
        className={classes["connection-round2"]}
        src="/svg/statistics/rounds-connection-2.svg"
        alt="team"
        width="42"
        height="495"
      />

      <div className={classes["round"]}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <Group key={num} />
        ))}
      </div>
      <div className={classes["round-2"]}>
        {[1, 2, 3, 4].map((num) => (
          <Group key={num} />
        ))}
      </div>
      <div className={classes["round"]}>
        <div className={classes["round-3"]}>
          {[1, 2].map((num) => (
            <Group key={num} />
          ))}
        </div>
      </div>
      <div className={classes["round-4"]}>
        <Group />
      </div>
    </div>
  );
};

export default Body;
