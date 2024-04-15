import React from "react";
import classes from "./standing.module.css";
const Standings = ({
  numOfActiveNunbers,
  borderHeader,
  items,
  footerElements,
}) => {
  return (
    <div className={classes["container"]}>
      <div
        className={
          borderHeader ? classes["bordered-header"] : classes["header"]
        }
      >
        <div className={classes["header-first"]}>
          <p className={classes["header-item"]}>#</p>
          <p className={classes["header-item"]}>Team</p>
        </div>
        <div className={classes["header-second"]}>
          {items.map((item) => (
            <p key={item} className={classes["header-item"]}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <span className={classes["devider"]}></span>
      <div className={classes["body"]}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className={classes["body-item"]}>
            <div className={classes["item-first"]}>
              {item < numOfActiveNunbers ? (
                <p className={classes["recent-num"]}>{item}</p>
              ) : (
                <p className={classes["num"]}>{item}</p>
              )}
              <p className={classes["team"]}>Manchester United</p>
            </div>
            <div className={classes["item-second"]}>
              {items.map((item) => (
                <p key={item} className={classes["wins"]}>
                  2
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className={classes["devider"]}></span>

      <div className={classes["footer"]}>
        {footerElements.map((item) => (
          <div key={item} className={classes["footer-element"]}>
            {
              <span
                className={
                  item === "Qualification Playoffs"
                    ? classes["green-circle"]
                    : classes["blue-circle"]
                }
              ></span>
            }
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;
