import React from "react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import ShowingChat from "../ui/showingChat/ShowingChat";
import LiveBtn from "../ui/live-button/LiveButton";
import WatchNavigation from "../ui/watchNavigation/WatchNavigation";
import SocialIcons from "../ui/whatchShare/SocialIcons";
import WatchVideoBody from "../ui/channels/watchVideoBody/WatchVideoBody";
import ProtonVpn from "../ui/protonVpn/ProtonVpn";
import Search from "../ui/channels/search/Search";
import NewFilter from "../ui/filter/NewFilter";
import classes from "./page.module.css";
import Servers from "../ui/channels/servers/Servers";
import { unstable_noStore as noStore } from "next/cache";

const Page = async ({ searchParams }) => {
  noStore();
  const session = await getServerSession(authConfig);
  const searchValue = searchParams?.search;

  const filterValue = searchParams?.filter;
  const channalActive = searchParams?.channel?.replace(/-/g, " ");
  let queryChannel;
  if (channalActive) {
    queryChannel = await axios.get(
      `${process.env.BACKEND_SERVER}/channels/channelName`,
      {
        params: {
          mode: "Visible",
          channelName: channalActive,
        },
      }
    );
  }

  const channels = await axios.get(`${process.env.BACKEND_SERVER}/channels`, {
    params: {
      page: 1,
      limit: 8,
      mode: "Visible",
      language: filterValue,
      searchValue: searchValue,
      or: ["channelName"],
    },
  });
  // const chatRules = await axios.get(
  //   `${process.env.BACKEND_SERVER}/chat/chatRules`
  // );
  // const chatMode = await axios.get(
  //   `${process.env.BACKEND_SERVER}/chat/chatMode`
  // );
  // const chatFilteredWords = await axios.get(
  //   `${process.env.BACKEND_SERVER}/chat/chatFilteredWords`
  // );

  // const chatMessages = await axios.get(`${process.env.BACKEND_SERVER}/chat`, {
  //   params: {
  //     limit: 0,
  //     room: "English (Default)",
  //     sort: { _id: 1 },
  //     mode: "normal",
  //   },
  // });
  const channelsServers = {
    channels: channels?.data?.data?.data,
    totalResults: channels?.data?.results,
  };
  // const channelsServers = channelsServer;
  const playingServer =
    queryChannel?.data?.data?.streamLinkUrl ||
    channels?.data?.data?.data[0]?.streamLinkUrl ||
    null;
  const playingServerName =
    queryChannel?.data?.data?.channelName ||
    channels?.data?.data?.data[0]?.channelName ||
    null;
  const langs = channels?.data?.allLanguages;
  return (
    <div className={classes["channels"]}>
      {/* <ShowingChat
        mode={chatMode}
        // chatMessages={chatMessages}
        // chatRules={chatRules}
        // chatFilteredWords={chatFilteredWords}
      /> */}
      <div className={classes["container"]}>
        <div className={classes["top-heading"]}>
          <span className={classes["heading-span"]}> Now Playing </span>
          <h3 className={classes["heading-title"]}>{playingServerName}</h3>
          <div className={classes["live-btn"]}>
            <LiveBtn text={"LIVE"} />
          </div>
        </div>

        <div className="watch-video-wrapper">
          <div className={classes["watch-video-top"]}>
            <div className={classes["navigation"]}>
              <WatchNavigation page={"channels"} />
            </div>

            <SocialIcons
              reportData={{ event: playingServerName, server: "Server 1" }}
            />
          </div>
          <WatchVideoBody
            // chatMessages={chatMessages}
            // chatRules={chatRules}
            // chatFilteredWords={chatFilteredWords}
            url={playingServer}
          />
        </div>
        <div className={classes["after-video"]}>
          <div className={classes["vpn"]}>
            <ProtonVpn />
          </div>
          <div className={classes["sort-search-wrapper"]}>
            <Search />
            <NewFilter
              channels={true}
              options={["All Languages", ...langs]}
              filterValue={filterValue}
            />
          </div>
          <Servers
            channalActive={channalActive || "BT Sports 1"}
            channelsServers={channelsServers}
            filterValue={filterValue}
            searchValue={searchValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
