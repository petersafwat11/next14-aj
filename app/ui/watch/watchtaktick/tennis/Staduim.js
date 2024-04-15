import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = ({ data }) => {
  return (
    <div className={classes["stadium"]}>
      {data.firstTeam.num === 1 ? (
        <div className={classes["palyer-1"]}>
          {data.secondTeam.players[1].gender === "Male" ? (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/tennis/player-2.svg"
              alt="tennis-racket"
              width="46"
              height="69"
            />
          ) : (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/tennis/player-1.svg"
              alt="tennis-racket"
              width="46"
              height="69"
            />
          )}
          <p className={classes["player-name"]}>
            {data.firstTeam.players[0].name}
          </p>
        </div>
      ) : (
        data.firstTeam.players.map((player, index) => (
          <div key={index} className={classes[`palyer-${index + 3}`]}>
            {player.gender === "Male" ? (
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/tennis/player-2.svg"
                alt="tennis-racket"
                width="46"
                height="69"
              />
            ) : (
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/tennis/player-1.svg"
                alt="tennis-racket"
                width="46"
                height="69"
              />
            )}
            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        ))
      )}
      {data.secondTeam.num === 1 ? (
        <div className={classes["palyer-1"]}>
          {data.secondTeam.players[0].gender === "Male" ? (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/tennis/player-2.svg"
              alt="tennis-racket"
              width="46"
              height="69"
            />
          ) : (
            <Image
              className={classes["player-icon"]}
              src="/svg/watch/tennis/player-1.svg"
              alt="tennis-racket"
              width="46"
              height="69"
            />
          )}
          <p className={classes["player-name"]}>
            {data.secondTeam.players[0].name}
          </p>
        </div>
      ) : (
        data.secondTeam.players.map((player, index) => (
          <div key={index} className={classes[`palyer-${index + 3}`]}>
            {player.gender === "Male" ? (
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/tennis/player-2.svg"
                alt="tennis-racket"
                width="46"
                height="69"
              />
            ) : (
              <Image
                className={classes["player-icon"]}
                src="/svg/watch/tennis/player-1.svg"
                alt="tennis-racket"
                width="46"
                height="69"
              />
            )}

            <p className={classes["player-name"]}>{player.name} </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Staduim;
