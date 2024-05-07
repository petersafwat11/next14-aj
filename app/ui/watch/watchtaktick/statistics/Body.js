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
                    width: String(item.home).includes("%")
                      ? item.home
                      : Number(item.home) + Number(item.away) === 0
                      ? 0
                      : `${Math.round(
                          (Number(item.home) * 100) /
                            (Number(item.home) + Number(item.away))
                        )}%`,
                  }}
                ></span>
              </div>
              <div className={classes["progress-bar-last"]}>
                <span
                  style={{
                    width: String(item.away).includes("%")
                      ? item.away
                      : Number(item.home) + Number(item.away) === 0
                      ? 0
                      : `${Math.round(
                          (Number(item.away) * 100) /
                            (Number(item.home) + Number(item.away))
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
