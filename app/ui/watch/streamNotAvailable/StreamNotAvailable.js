import React, { useEffect, useState } from "react";
import classes from "./streamNotAvailable.module.css";
import { calcRemainingTime } from "@/app/lib/datesFunctions";
const StreamNotAvailable = ({ eventDate }) => {
  const [remainingTime, setRemainingTime] = useState(
    calcRemainingTime(eventDate)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calcRemainingTime(eventDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate, remainingTime]);
  return (
    <div className={classes["stream-not-available"]}>
      <div className={classes["container"]}>
        <p className={classes["text"]}>This stream will be available in </p>
        <p className={classes["remaining-time"]}>{remainingTime}</p>
        <span></span>
      </div>
    </div>
  );
};

export default StreamNotAvailable;
