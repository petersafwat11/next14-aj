import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { langs } from "./data";
import classes from "./settings.module.css";
import axios from "axios";

const Settings = ({ toggleSettings }) => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const [showActiveSelection, setShowActiveSelection] = useState("");
  const handleShowSelection = (selection) => {
    setShowActiveSelection(selection);
  };
  const [userSettings, setUserSettings] = useState({
    lang: "English (United Kingdom)",
    country: "United Kingdom",
    currency: "GBP - £",
  });
  const changeLang = (val) => {
    setUserSettings((values) => ({ ...values, lang: val }));
  };
  const changeCountry = (val) => {
    setUserSettings((values) => ({ ...values, country: val }));
  };
  const changeCurrency = (val) => {
    setUserSettings((values) => ({ ...values, currency: val }));
  };

  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // setLocation({ latitude, longitude });
      console.log(
        `Latitude: ${latitude}, Longitude: ${longitude}, ${position}`
      );

      // // Make API call to OpenWeatherMap
      // fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setWeather(data);
      //     console.log(data);
      //   })
      //   .catch((error) => console.log(error));
    }

    function error() {
      // console.log("Unable to retrieve your location");
    }

    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // setLocation({ latitude, longitude });
          },
          () => {
            console.log("Unable to retrieve your location");
          }
        );
      } else {
        console.log("Geolocation not supported");
      }
    }

    handleLocationClick();
  }, [location, weather]);
  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <h3 className={classes["title"]}>Regional Settings</h3>
        <Image
          onClick={toggleSettings}
          className={classes["close"]}
          src="/svg/home/close.svg"
          alt="logo"
          width="21"
          height="21"
        />
      </div>
      <div className={classes["body"]}>
        <div className={classes["settings-options"]}>
          <SettingOption
            onClick={changeLang}
            activeSelection={showActiveSelection}
            handleShowSelection={handleShowSelection}
            type="Language"
            val={userSettings.lang}
            options={langs}
          />
          <SettingOption
            onClick={changeCountry}
            activeSelection={showActiveSelection}
            handleShowSelection={handleShowSelection}
            type="Country / Region"
            val={userSettings.country}
            options={langs}
          />
          <SettingOption
            onClick={changeCurrency}
            activeSelection={showActiveSelection}
            handleShowSelection={handleShowSelection}
            type="Currency"
            val={userSettings.currency}
            options={langs}
          />
        </div>
        <button className={classes["save-btn"]}>Save</button>
      </div>
    </div>
  );
};

export default Settings;

export const SettingOption = ({
  type,
  val,
  options,
  handleShowSelection,
  activeSelection,
  onClick,
}) => {
  return (
    <div className={classes["setting-option"]}>
      <p className={classes["label"]}>{type}</p>
      <div
        onClick={() => {
          if (activeSelection === type) {
            return handleShowSelection(null);
          }
          handleShowSelection(type);
        }}
        className={classes["selector"]}
      >
        <p>{val}</p>
        <IoIosArrowDown className={classes["arrow"]} />
      </div>
      <div
        className={
          activeSelection === type
            ? classes["active-options"]
            : classes["options"]
        }
      >
        {options.map((opt, index) => (
          <p
            onClick={() => {
              onClick(opt.name);
            }}
            key={index}
            className={classes["option"]}
          >
            {opt.name}{" "}
          </p>
        ))}
      </div>
    </div>
  );
};
