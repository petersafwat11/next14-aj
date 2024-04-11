"use client";
import React, { useEffect, useState } from "react";
import { calcRemainingTime } from "../../../utils/convertDateFormat";
import classes from "./remainingTime.module.css";
const RemainingTime = () => {
  // YYYY-MM-DD HH:MM:SS.
  const [remainingTime, setRemainingTime] = useState(
    calcRemainingTime("2024-02-02T00:00:00.000+00:00", "pricing")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        calcRemainingTime("2024-02-02T00:00:00.000+00:00", "pricing")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <p className={classes["remaining-time"]}>{remainingTime}</p>;
};

export default RemainingTime;
