import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = () => {
  return (
    <div className={classes["container"]}>
      <Image
      className={classes['logo']}
        src="/svg/watch/darts/pitch.svg"
        alt="pitch"
        width="195"
        height="196"
      />
      <div className={classes["stadium"]}>
        <div className={classes["players"]}>
          <div className={classes["players-container-1"]}>
            {[1, 2].map((player) => (
              <div key={player} className={classes["player"]}>
                <p className={classes["player-name"]}>K. NURMAGHOV</p>
                <p className={classes["player-nationality"]}>American</p>
              </div>
            ))}
          </div>
          <div className={classes["players-container-2"]}>
            {[3, 4].map((player) => (
              <div key={player} className={classes["player"]}>
                <p className={classes["player-name"]}>K. NURMAGHOV</p>
                <p className={classes["player-nationality"]}>American</p>
              </div>
            ))}
          </div>
          <div className={classes["players-container-3"]}>
            {[5, 6].map((player) => (
              <div key={player} className={classes["player"]}>
                <p className={classes["player-name"]}>K. NURMAGHOV</p>
                <p className={classes["player-nationality"]}>American</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staduim;
