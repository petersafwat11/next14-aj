import React from "react";
import classes from './details.module.css'
const Details = ({matchDetails}) => {
  return (
    <div className={classes["details"]}>
      {matchDetails.map((item, index) => (
        <div key={index} className={classes["details-item"]}>
          <p className={classes["item-left"]}>{item.left}</p>
          <p className={classes["item-right"]}>{item.right}</p>
        </div>
      ))}
    </div>
  );
};

export default Details;
