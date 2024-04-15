"use client";
import React, { useState } from "react";
// import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows";
import classes from "./serverButtons.module.css";
import ChangeServer from "../changeServer/ChangeServer";
import Popup from "../../popupWrapper/Popup";
const ServersButtons = ({ playingServerLang, servers, notLive }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChangeServer, setShowChangeServer] = useState(false);
  const [langOtherServersAvailable, setlangOtherServersAvailable] = useState(
    []
  );

  const toggleServers = () => {
    setShowChangeServer(!showChangeServer);
  };
  const handleServerClicks = (val, lang) => {
    console.log(val);
    toggleServers();
    setlangOtherServersAvailable({ servers: val[Object.keys(val)[0]], lang });
    console.log(val[Object.keys(val)[0]]);
  };
  const handleChangeServers = (val, lang) => {
    toggleServers();
    // setPlayingServerLang(lang);
    setPlayingServer({ server: val, lang });
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: servers?.length > 4 ? 4 : servers?.length,
    slidesToScroll: 1,
    nextArrow:
      servers?.length - 4 > 0 && servers?.length - 4 - currentSlide > 0 ? (
        <NextArrow />
      ) : null,
    prevArrow: currentSlide === 0 ? null : <PrevArrow />,
    afterChange: (current) => {
      console.log(current);
      setCurrentSlide(current);
    },
  };

  return (
    <>
      {showChangeServer && (
        <Popup>
          <ChangeServer
            playingServer={playingServer}
            langOtherServersAvailable={langOtherServersAvailable?.servers}
            lang={langOtherServersAvailable?.lang}
            handleChangeServers={handleChangeServers}
            toggleServers={toggleServers}
          />
        </Popup>
      )}
      <div className={classes["wrapper"]}>
        <div className={classes["container"]}>
          <Slider {...settings}>
            {servers &&
              servers?.map((item, index) => (
                <div
                  onClick={() => {
                    handleServerClicks(item, Object.keys(item)[0]);
                  }}
                  key={`${index}-${item}`}
                  className={
                    notLive
                      ? classes["lang"]
                      : playingServerLang === Object.keys(item)[0]
                      ? classes["lang-selected"]
                      : classes["lang"]
                  }
                >
                  <p
                    className={
                      notLive && Object.keys(item)[0] === "arabic"
                        ? classes["arabic-lang"]
                        : notLive
                        ? classes["lang-text"]
                        : Object.keys(item)[0] === "arabic" &&
                          playingServerLang === Object.keys(item)[0]
                        ? classes["arabic-selected"]
                        : Object.keys(item)[0] === "arabic"
                        ? classes["arabic-lang"]
                        : playingServerLang === Object.keys(item)[0]
                        ? classes["text-selected"]
                        : classes["lang-text"]
                    }
                  >
                    {Object.keys(item)[0] == "arabic"
                      ? "العربيه"
                      : Object.keys(item)[0]}
                  </p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ServersButtons;
