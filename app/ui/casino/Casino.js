import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import classes from "./casino.module.css";
const Casino = () => {
  return (
    <div className={classes["casino"]}>
      <img
        className={classes["logo"]}
        src="/svg/casino/logo.svg"
        alt="logo"
        height="21"
      />
      <img
        className={classes["logo-mobile"]}
        src="/svg/casino/logo-mobile.svg"
        alt="logo"
        height="21"
      />
      <img
        className={classes["spin"]}
        src="/svg/casino/spin.svg"
        alt="spin"
        height="64"
        width="132"
      />
      <img
        className={classes["spin-mobile"]}
        src="/svg/casino/spin-mobile.svg"
        alt="spin"
        height="37"
        width="101"
      />
      <img
        className={classes["wallet"]}
        src="/svg/casino/wallet.svg"
        alt="wallet"
        // width="130"
      />
      <img
        className={classes["wallet-mobile"]}
        src="/svg/casino/wallet-mobile.svg"
        alt="wallet"
        // width="130"
      />
      <p className={classes["para"]}>The best casino & sports betting </p>
      <h2 className={classes["title"]}>WELCOME BONUS UP TO 5 BTC</h2>
      <button className={classes["button"]}>
        Play now <BiRightArrowAlt className={classes["right-arrow"]} />{" "}
      </button>
    </div>
  );
};

export default Casino;
