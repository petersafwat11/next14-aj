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

  const data = await Promise.all([
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatRules`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatMode`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatFilteredWords`),
    axios.get(`${process.env.BACKEND_SERVER}/chat`, {
      params: {
        limit: 0,
        room: "English (Default)",
        sort: { _id: 1 },
        mode: "normal",
      },
    }),
    axios.get(`${process.env.BACKEND_SERVER}/channels`, {
      params: {
        page: 1,
        limit: 8,
        mode: "Visible",
        language: filterValue,
        searchValue: searchValue,
        or: ["channelName"],
      },
    }),
    axios.get(`${process.env.BACKEND_SERVER}/links`, {
      params: {
        fields: "social",
      },
    }),
  ])
    .then((responses) => {
      // responses is an array of axios responses
      const [
        chatRules,
        chatMode,
        chatFilteredWords,
        chatMessages,
        channelsData,
        links,
      ] = responses;

      // Access the data from each response
      const rulesData = chatRules?.data?.data?.data[0].rules;
      const modeData = chatMode?.data?.data?.data[0];
      const filteredWordsData = chatFilteredWords.data?.data?.data[0].words;
      const messagesData = chatMessages.data?.data?.data;
      const channels = channelsData.data;
      const social = links.data?.data?.data[0].social;

      return {
        rulesData,
        modeData,
        filteredWordsData,
        messagesData,
        channels,
        social,
      };
    })
    .catch((error) => {
      // Handle any errors that occurred during any of the requests
      console.error("Error in fetching chat resources:", error);
    });
  console.log(data?.channels?.data?.data[0]?.streamLink?.URL);
  const channelsServers = {
    channels: data?.channels?.data?.data,
    totalResults: data?.channels?.results,
  };
  // const channelsServers = channelsServer;
  const playingServer =
    queryChannel?.data?.data?.streamLink?.URL ||
    data?.channels?.data?.data[0]?.streamLink?.URL ||
    null;
  console.log("playing server", playingServer);
  const playingServerName =
    queryChannel?.data?.data?.channelName ||
    data?.channels?.data?.data[0]?.channelName ||
    null;
  const langs = data?.channels?.allLanguages;
  return (
    <div className={classes["channels"]}>
      <ShowingChat
        mode={data.modeData}
        chatMessages={data.messagesData}
        chatRules={data.rulesData}
        chatFilteredWords={data.filteredWordsData}
      />
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
            social={data?.social}
            mode={data?.modeData}
            chatMessages={data?.messagesData}
            chatRules={data?.rulesData}
            chatFilteredWords={data?.filteredWordsData}
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
