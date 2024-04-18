// "use client";
import Image from "next/image";
import classes from "./eventCountdown.module.css";
// import { calcRemainingTime, determineLive } from "@/app/lib/datesFunctions";
const EventCountDown = ({ remainingTime }) => {
  // const [remainingTime, setRemainingTime] = useState(calcRemainingTime(null));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingTime(calcRemainingTime(eventDate));
  //     // setLive(determineLive(eventDate));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [eventDate]);

  return (
    <div className={classes["container"]}>
      <Image
        className={classes["logo"]}
        src="/svg/watch/event-will-start/logo.svg"
        alt="logo"
        width="111"
        height="67"
      />
      <div className={classes["text-wrapper"]}>
        <p className={classes["text"]}>The event will start in </p>
        <p className={classes["remaining-time"]}>{remainingTime} </p>
      </div>
    </div>
  );
};

export default EventCountDown;
