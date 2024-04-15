import Image from "next/image";
import { leaguesData } from "../data";
import classes from "./league.module.css";
const LeagueMenu = ({ handleChangeLeagueActive, leagueActive }) => {
  return (
    <div className={classes["leagueMenu"]}>
      <div className={classes["leagueMenu-container"]}>
        {leaguesData.map((item) => (
          <div
            onClick={() => {
              handleChangeLeagueActive(item.name);
            }}
            key={item.name}
            className={
              leagueActive === item.name
                ? classes["leagueMenu-container-img-active"]
                : classes["leagueMenu-container-img"]
            }
          >
            <Image
              src={`/svg/statistics/${item.name}.svg`}
              alt={item.name}
              width="70"
              height="70"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueMenu;
