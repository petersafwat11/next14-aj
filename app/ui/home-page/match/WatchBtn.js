import { useRouter } from "next/navigation";
import React from "react";
import classes from "./watchBtn.module.css";

const WatchBtn = ({ name }) => {
  const router = useRouter();

  return (
    <div className={classes["action-button"]}>
      <button
        onClick={() => {
          router.push(`/watch/${name}`, { scroll: false });
        }}
        className={classes["watch-button"]}
      >
        WATCH
      </button>
    </div>
  );
};

export default WatchBtn;
