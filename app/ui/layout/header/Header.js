"use client";
import React, { useState } from "react";
import { Menu } from "./Menu";
import { MenuMobile } from "./Mobile-menu";
import TopHeader from "./TopHeader";
import classes from "./header.module.css";
import Settings from "./settings/Settings";
import Popup from "../../popupWrapper/Popup";
const Header = () => {
  const [showSettings, setShowSettings] = useState();
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      {showSettings && (
        <Popup>
          <Settings toggleSettings={toggleSettings} />
        </Popup>
      )}

      <header className={classes["header"]}>
        <TopHeader toggleSettings={toggleSettings} />
        <Menu />
      </header>
      <header className={classes["header-mobile"]}>
        <MenuMobile />
      </header>
    </>
  );
};

export default Header;
