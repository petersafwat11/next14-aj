import Image from "next/image";
import React from "react";
import classes from "./subsitutes.module.css";
const Subsitutes = () => {
  return (
    <div className={classes["subsitutes"]}>
      {[1, 2, 3, 4, 5, 6].map((subsitute) => (
        <div key={subsitute} className={classes["subsitute"]}>
          <div className={classes["left"]}>
            <Image
              className={classes["arrow-up"]}
              src="/svg/watch/football/arrow-up.svg"
              alt="arrow-up"
              width="15"
              height="18"
            />
            <Image
              className={classes["arrow-down"]}
              src="/svg/watch/football/arrow-down.svg"
              alt="arrow-down"
              width="9"
              height="12"
            />
          </div>
          <div className={classes["right"]}>
            <p className={classes["player-in"]}>C. Ronaldo</p>
            <p className={classes["player-out"]}>Fred</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subsitutes;
