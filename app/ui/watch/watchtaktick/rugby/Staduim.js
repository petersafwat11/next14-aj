import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = () => {
  return (
    <div className={classes["stadium"]}>
      {[
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fivteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "ninteen",
        "twenty",
        "twenty-one",
        "twenty-two",
        "twenty-three",
        "twenty-four",
        "twenty-five",
        "twenty-six",
      ].map((item, index) => (
        <div key={item} className={classes[item]}>
          {index < 13 ? (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/rugby/red-circle.svg"
              alt="player-icon"
              width="21"
              height="21"
            />
          ) : (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/rugby/blue-circle.svg"
              alt="player-icon"
              width="21"
              height="21"
            />
          )}
          <p className={classes["player-name"]}>lorem</p>
        </div>
      ))}
    </div>
  );
};

export default Staduim;
