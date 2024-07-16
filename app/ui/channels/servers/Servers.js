"use client";
import React, { useEffect, useState } from "react";
import classes from "./servers.module.css";
import Image from "next/image";
import ShowMore from "../../showMore/ShowMore";
import { useRouter } from "next/navigation";
import action from "@/app/lib/action";
const Servers = ({
  channelsServers,
  channalActive,
  filterValue,
  searchValue,
}) => {
  // console.log("channalActive", channalActive);
  const router = useRouter();
  const [servers, setServers] = useState(channelsServers?.channels);
  useEffect(() => {
    setServers(channelsServers?.channels);
  }, [channelsServers]);
  return (
    <>
      {" "}
      <div className={classes["watch-video-servers"]}>
        {servers?.length > 0 ? (
          servers.map((channelobj, index) => (
            <button
              onClick={() => {
                action("channels");
                router.replace(
                  `/channels?channel=${channelobj?.channelName?.replace(
                    / /g,
                    "-"
                  )}`
                );
              }}
              key={index}
              className={
                !channalActive && index === 0
                  ? classes["servers-button-active"]
                  : channalActive === channelobj?.channelName
                  ? classes["servers-button-active"]
                  : classes["watch-video-servers-button"]
              }
            >
              {channalActive === channelobj?.channelName ||
                (!channalActive && index === 0 && (
                  <div className={classes["check-div"]}>
                    <Image
                      className={classes["checked-icon"]}
                      width="9"
                      height="8"
                      alt="checked"
                      src="/svg/channels/checked.svg"
                    />
                  </div>
                ))}
              {channelobj?.channelName}
            </button>
          ))
        ) : (
          <p>{`there isn't channels avaialbe now`}</p>
        )}
      </div>
      {/* {channelsServers?.totalResults > servers?.length && (
        <div className="show-more-wrapper">
          <ShowMore
            query={{
              limit: 20,
              intialNumber: 8,
              mode: "Visible",
              language:
                filterValue === "All Languages" ? undefined : filterValue,
              searchValue: searchValue,
              or: ["channelName"],
            }}
            page={"streamlink"}
            updateState={setServers}
            oldData={servers}
          />
        </div>
      )} */}
    </>
  );
};

export default Servers;
