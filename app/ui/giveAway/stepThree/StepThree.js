import Image from "next/image";
import React from "react";
import classes from "./stepThree.module.css";
const StepThree = ({id}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["success"]}>
        <Image
          className={classes["success-icon"]}
          src="/svg/done-icon.svg"
          alt="success"
          width="70"
          height="68"
        />
      </div>
      <div className={classes["body"]}>
        <h3 className={classes["success-id"]}>
          Entry Ticket ID: <span>{id} </span>{" "}
        </h3>
        <p className={classes["success-message"]}>
          You have successfully entered the giveaway! We will send you an email
          confirmation with your ticket ID and details shortly. Please keep the
          ticket ID above safe in the meantime.
        </p>
      </div>
    </div>
  );
};

export default StepThree;
