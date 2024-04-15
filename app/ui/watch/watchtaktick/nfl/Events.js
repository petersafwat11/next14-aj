import React, { useState } from "react";
import MatchDots from "../matchDots/MatchDots";
import classes from "./events.module.css";
const Events = () => {
  const [option, setOption] = useState(1);
  const changeCategory = (option) => {
    setOption(option);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["events"]}>
        {[1, 2, 3].map((event, index) => (
          <div key={index} className={classes["event"]}>
            <p className={classes["event-time"]}>22:00</p>
            <p className={classes["event-description"]}>
              LIONEL MESSI JUST SCORED A TOUCHDOWN WITH 3 MINUTES LEFT TO THE
              WHISTLE
            </p>
          </div>
        ))}
      </div>
      <MatchDots
        options={[1, 2, 3, 4]}
        selectedOption={option}
        changeOptions={changeCategory}
      />
    </div>
  );
};

export default Events;
