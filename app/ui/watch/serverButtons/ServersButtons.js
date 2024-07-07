"use client";
import React, { useEffect, useState } from "react";
// import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows";
import classes from "./serverButtons.module.css";
import ChangeServer from "../changeServer/ChangeServer";
import Popup from "../../popupWrapper/Popup";
import StreamNotAvailable from "../streamNotAvailable/StreamNotAvailable";
const ServersButtons = ({
  servers,
  notLive,
  playingServer,
  setPlayingServer,
  eventDate,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChangeServer, setShowChangeServer] = useState(false);
  const [langOtherServersAvailable, setlangOtherServersAvailable] = useState(
    []
  );
  const [streamNotAvailable, setStreamNotAvailable] = useState(false);
  const toggleServers = () => {
    setShowChangeServer(!showChangeServer);
  };
  const handleServerClicks = (val, lang) => {
    if (notLive) {
      setStreamNotAvailable(!streamNotAvailable);
      return;
    }
    toggleServers();
    setlangOtherServersAvailable({ servers: val[Object.keys(val)[0]], lang });
  };
  const handleChangeServers = (val, lang) => {
    toggleServers();
    setPlayingServer({ server: val, lang });
  };
  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: servers?.length > 3 ? 4 : servers?.length,
    slidesToScroll: 1,
    nextArrow: servers?.length - 3 > 0 ? <NextArrow /> : null,
    prevArrow: currentSlide > 0 ? <PrevArrow /> : null,
    afterChange: (current) => {
      setCurrentSlide(current);
    },
  };
  useEffect(() => {
    if (streamNotAvailable) {
      setTimeout(() => {
        setStreamNotAvailable(false);
      }, [5000]);
    }
  }, [streamNotAvailable]);

  return (
    <>
      {streamNotAvailable && (
        <Popup>
          <StreamNotAvailable eventDate={eventDate} />
        </Popup>
      )}
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
                      : playingServer?.lang === Object.keys(item)[0]
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
                          playingServer?.lang === Object.keys(item)[0]
                        ? classes["arabic-selected"]
                        : Object.keys(item)[0] === "arabic"
                        ? classes["arabic-lang"]
                        : playingServer?.lang === Object.keys(item)[0]
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
