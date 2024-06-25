import React, { useEffect, useState } from "react";
import classes from "./serversButtonsMobile.module.css";
import Popup from "@/app/ui/popupWrapper/Popup";
import StreamNotAvailable from "../../streamNotAvailable/StreamNotAvailable";
import ChangeServer from "../../changeServer/ChangeServer";
const ServersButtonsMobile = ({
  servers,
  notLive,
  playingServer,
  setPlayingServer,
  eventDate,
}) => {
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
  useEffect(() => {
    if (streamNotAvailable) {
      setTimeout(() => {
        setStreamNotAvailable(false);
      }, [5000]);
    }
  }, [streamNotAvailable]);

  return (
    <div className={classes["container"]}>
      {streamNotAvailable && (
        <Popup>
          {" "}
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

      {servers?.map((item, index) => (
        <div
          onClick={() => {
            handleServerClicks(item, Object.keys(item)[0]);
          }}
          key={`${index}-${item}`}
          className={
            playingServer?.lang === Object.keys(item)[0]
              ? classes["lang-selected"]
              : classes["lang"]
          }
        >
          <p
            className={
              Object.keys(item)[0] == "arabic" &&
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
    </div>
  );
};

export default ServersButtonsMobile;
