import Image from "next/image";
import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./formation.module.css";
const Formation = () => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["racing"]}>
        <div className={classes["left"]}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={classes["player"]}>
              <Image
                alt="car"
                src="/svg/watch/f1/car.svg"
                width="30"
                height="48"
              />
              <p className={classes["player-name"]}>L. Hamilton</p>
              <p className={classes["order"]}>1</p>
            </div>
          ))}
        </div>
        <div className={classes["center"]}></div>
        <div className={classes["right"]}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={classes["player"]}>
              <Image
                alt="car"
                src="/svg/watch/f1/car.svg"
                width="30"
                height="48"
              />
              <p className={classes["player-name"]}>L. Hamilton</p>
              <p className={classes["order"]}>1</p>
            </div>
          ))}
        </div>
      </div>
      <MatchDots
        options={[1, 2, 3, 4]}
        selectedOption={option}
        changeOptions={changeCategory}
      />
    </div>
  );
};

export default Formation;
