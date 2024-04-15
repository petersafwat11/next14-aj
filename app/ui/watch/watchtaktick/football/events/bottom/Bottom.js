import Image from "next/image";
import React from "react";
import classes from "./bottom.module.css";
const Bottom = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["elems"]}>
        <div className={classes["first-row"]}>
          <div className={classes["elem"]}>
            <Image
              className={classes["card"]}
              src="/svg/watch/football/yellow-card.svg"
              alt="arrow-up"
              width="18"
              height="27"
            />

            <p className={classes["name"]}>Yellow Card</p>
          </div>
          <div className={classes["elem"]}>
            <Image
              className={classes["card"]}
              src="/svg/watch/football/red-card.svg"
              alt="arrow-up"
              width="18"
              height="27"
            />

            <p className={classes["name"]}>Red Card</p>
          </div>
          <div className={classes["elem"]}>
            <Image
              className={classes["var"]}
              src="/svg/watch/football/var.svg"
              alt="arrow-up"
              width="21"
              height="25"
            />

            <p className={classes["name"]}>VAR</p>
          </div>
          <div className={classes["elem"]}>
            <Image
              className={classes["substitute"]}
              src="/svg/watch/football/substitute.svg"
              alt="arrow-up"
              width="18"
              height="21"
            />

            <p className={classes["name"]}>Substitute</p>
          </div>
        </div>
        <div className={classes["sec-row"]}>
          <div className={classes["elem"]}>
            <Image
              className={classes["goal"]}
              src="/svg/watch/football/ball-icon.svg"
              alt="arrow-up"
              width="22"
              height="22"
            />

            <p className={classes["name"]}>Goal</p>
          </div>
          <div className={classes["elem"]}>
            <Image
              className={classes["penalty"]}
              src="/svg/watch/football/ball-icon.svg"
              alt="arrow-up"
              width="22"
              height="22"
            />

            <p className={classes["name"]}>Penalty</p>
          </div>
          <div className={classes["elem"]}>
            <Image
              className={classes["own-goal"]}
              src="/svg/watch/football/ball-icon.svg"
              alt="own goal"
              width="22"
              height="22"
            />

            <p className={classes["name"]}>Own Goal</p>
          </div>
        </div>
      </div>
      <p className={classes["bottom-text"]}>
        *Hover over the goal on the timeline to watch the replay of the event.
      </p>
    </div>
  );
};

export default Bottom;
