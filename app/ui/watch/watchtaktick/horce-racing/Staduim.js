import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = ({ data }) => {
  return (
    <div className={classes["stadium"]}>
      <div className={classes["players"]}>
        {data.players.map((horse, index) => (
          <div key={horse} className={classes["player"]}>
            {index + 1 === 1 || index + 1 == 4 ? (
              <Image
                className={classes["hourse-icon"]}
                src="/svg/watch/horse-racing/brown-horse.svg"
                alt="helmet"
                width="45"
                height="51"
              />
            ) : index + 1 === 2 || index + 1 === 5 ? (
              <Image
                className={classes["hourse-icon"]}
                src="/svg/watch/horse-racing/white-horse.svg"
                alt="helmet"
                width="45"
                height="51"
              />
            ) : (
              <Image
                className={classes["hourse-icon"]}
                src="/svg/watch/horse-racing/yellow-horse.svg"
                alt="helmet"
                width="45"
                height="51"
              />
            )}
            <p className={classes["player-name"]}>{horse.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staduim;
