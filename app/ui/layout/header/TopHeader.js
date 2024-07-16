import Image from "next/image";
import Link from "next/link";
import React from "react";
import RegionalSettings from "./regionalSettings/RegionalSettings";
import classes from "./topHeader.module.css";
import Beta from "../beta/Beta";
const TopHeader = ({ toggleSettings }) => {
  return (
    <div className={classes["top-header"]}>
      {/* <div className={classes["logo-wrapper"]}> */}
      <Image
        className={classes["logo"]}
        src="/svg/layout/header/logo.svg"
        alt="logo"
        width="61"
        height="43"
      />
      <div className={classes["beta"]}>
        <Beta />
      </div>
      {/* </div> */}
      {/* <div className={classes["right"]}>
        <div className={classes["top-header-items"]}>
          <Link href="/donate" className={classes["top-header-item"]}>
            DONATE
          </Link>
          <Link href="/giveaway" className={classes["top-header-item"]}>
            GIVEAWAY
          </Link>
          <Link href="/pricing" className={classes["top-header-item"]}>
            PRICING
          </Link>
        </div>
        <div className={classes["user-wrapper"]}>
          <Image
            src="/svg/layout/header/user.svg"
            alt="user"
            width="12"
            height="12"
          />
        </div>
        <RegionalSettings toggleSettings={toggleSettings} />
        <LanguesDropdown />
      </div> */}
    </div>
  );
};

export default TopHeader;
