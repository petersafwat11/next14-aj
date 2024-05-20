import React from "react";
import classes from "./loading.module.css";
import Popup from "./ui/popupWrapper/Popup";
const loading = () => {
  return (
    <div className={classes["space"]}>
      <Popup>
        <div className={classes["loader"]}></div>
      </Popup>
    </div>
  );
};

export default loading;
