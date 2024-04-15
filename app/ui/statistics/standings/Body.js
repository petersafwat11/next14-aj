import React from "react";
import classes from "./body.module.css";
const Body = ({ standingsData }) => {
  return (
    <div className={classes["standing-items"]}>
      {standingsData.map((item, index) => (
        <div key={index} className={classes["standings-item"]}>
          <div className={classes["standings-item-first"]}>
            <p className={classes["standings-item-para"]}>{index + 1}</p>
            <div className={classes["first-team"]}>
              <img
                className={classes["first-team-image"]}
                src={item.team.logo}
                alt="team"
                width="24"
              />
              <p className={classes["standings-item-para"]}>{item.team.name}</p>
            </div>
          </div>
          <div className={classes["standings-item-second"]}>
            <p className={classes["standings-item-para"]}>{item.all.played}</p>
            <p className={classes["standings-item-para"]}>{item.all.win}</p>
            <p className={classes["standings-item-para"]}>{item.all.draw}</p>
            <p className={classes["standings-item-para"]}>{item.all.lose}</p>
            <p className={classes["standings-item-para"]}>
              {item.all.goals.for}
            </p>
            <p className={classes["standings-item-para"]}>
              {item.all.goals.against}
            </p>
            <div className={classes["Last-5"]}>
              {item.form
                .split("")
                .map((result, index) =>
                  result === "W" ? (
                    <span key={index} className={classes["win"]}></span>
                  ) : result === "L" ? (
                    <span key={index} className={classes["lose"]}></span>
                  ) : (
                    <span key={index} className={classes["draw"]}></span>
                  )
                )}
            </div>
            <p className={classes["standings-item-para"]}>{item.points}</p>
          </div>
          <div className={classes["standings-item-second-mobile"]}>
            <p className={classes["standings-item-para"]}>{item.all.played}</p>
            <p className={classes["standings-item-para"]}>{item.all.win}</p>
            <p className={classes["standings-item-para"]}>{item.all.draw}</p>
            <p className={classes["standings-item-para"]}>{item.all.lose}</p>
            <p className={classes["standings-item-para"]}>{item.points}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
