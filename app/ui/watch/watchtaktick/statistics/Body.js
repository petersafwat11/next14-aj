import React from "react";
import classes from "./body.module.css";
const Body = ({ options, data }) => {
  return (
    <div className={classes["stats"]}>
      {data &&
        data.map((item, index) => (
          <div key={index} className={classes["stats-item"]}>
            <div className={classes["item-top"]}>
              <p className={classes["first"]}>{item.home}</p>
              <p className={classes["middle"]}>{item.name}</p>
              <p className={classes["last"]}>{item.away}</p>
            </div>
            <div className={classes["progress-bar"]}>
              <div className={classes["progress-bar-first"]}>
                <span
                  style={{
                    width: `${Math.round(
                      (item.home * 100) / (item.home + item.away)
                    )}%`,
                  }}
                ></span>
              </div>
              <div className={classes["progress-bar-last"]}>
                <span
                  onClick={() => {
                    console.log(
                      Math.round((item.away * 100) / (item.home + item.away))
                    );
                  }}
                  style={{
                    width: `${Math.round(
                      (item.away * 100) / (item.home + item.away)
                    )}%`,
                  }}
                ></span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Body;
