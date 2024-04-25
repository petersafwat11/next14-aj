import Image from "next/image";
import React from "react";
import classes from "./OtherPaymentMethod.module.css";
const OtherPaymentMethod = ({ title, data, message, toggle, button }) => {
  return (
    <div className={classes["payment-method"]}>
      <div className={classes["top"]}>
        <h2 className={classes["heading"]}>{title}</h2>
        <Image
          onClick={toggle}
          className={classes["exit"]}
          src="/svg/exit.svg"
          alt="exit"
          width="12"
          height="12"
        />
      </div>
      <div className={classes["data"]}>{data}</div>
      <div className={classes["thankful-message"]}>
        <p className={classes["message"]}>{message}</p>
        <button onClick={toggle} className={classes["paid-button"]}>
          {button}
        </button>
      </div>
    </div>
  );
};

export default OtherPaymentMethod;
