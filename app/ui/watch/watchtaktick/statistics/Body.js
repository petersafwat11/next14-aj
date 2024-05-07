import React from "react";
import classes from "./body.module.css";
const Body = ({ options, data }) => {
  const matchPercetageValue = (str) => {
    const match = str.match(/\((\d+)%\)/); // Regular expression to match the value between parentheses
    if (match && match[1]) {
      const value = match[1];
      return value + "%";
    }
  };
  const getStatPercentage = (baseValue, otherValue) => {
    const percentageValue = String(baseValue).includes("%")
      ? matchPercetageValue(baseValue)
      : Number(baseValue) + Number(otherValue) === 0
      ? 0
      : `${Math.round(
          (Number(baseValue) * 100) / (Number(baseValue) + Number(otherValue))
        )}%`;
    return percentageValue;
  };
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
                    width: getStatPercentage(item.home, item.away),
                  }}
                ></span>
              </div>
              <div className={classes["progress-bar-last"]}>
                <span
                  style={{
                    width: getStatPercentage(item.away, item.home),
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
