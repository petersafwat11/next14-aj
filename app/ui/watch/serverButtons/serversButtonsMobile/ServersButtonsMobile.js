import React from "react";
import classes from "./serversButtonsMobile.module.css";
const ServersButtonsMobile = ({
  playingServerLang,
  servers,
  handleServerClicks,
}) => {
  return (
    <div className={classes["container"]}>
      {servers?.map((item, index) => (
        <div
          onClick={() => {
            handleServerClicks(item, Object.keys(item)[0]);
          }}
          key={`${index}-${item}`}
          className={
            playingServerLang === Object.keys(item)[0]
              ? classes["lang-selected"]
              : classes["lang"]
          }
        >
          <p
            className={
              Object.keys(item)[0] == "arabic" &&
              playingServerLang === Object.keys(item)[0]
                ? classes["arabic-selected"]
                : Object.keys(item)[0] === "arabic"
                ? classes["arabic-lang"]
                : playingServerLang === Object.keys(item)[0]
                ? classes["text-selected"]
                : classes["lang-text"]
            }
          >
            {Object.keys(item)[0] == "arabic"
              ? "العربيه"
              : Object.keys(item)[0]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServersButtonsMobile;
