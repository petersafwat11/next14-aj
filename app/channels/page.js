import React from "react";
import axios from "axios";
import ShowingChat from "../ui/showingChat/ShowingChat";
import LiveBtn from "../ui/live-button/LiveButton";
import WatchNavigation from "../ui/watchNavigation/WatchNavigation";
import SocialIcons from "../ui/whatchShare/SocialIcons";
import WatchVideoBody from "../ui/channels/watchVideoBody/WatchVideoBody";
import Search from "../ui/channels/search/Search";
import NewFilter from "../ui/filter/NewFilter";
import classes from "./page.module.css";
import Servers from "../ui/channels/servers/Servers";
import { unstable_noStore as noStore } from "next/cache";
import Casino from "../ui/casino/Casino";
import Advert from "../ui/advert/Advert";
export const metadata = {
  title: "Channels | AJ Sports",
};
const Page = async ({ searchParams }) => {
  noStore();
  const searchValue = searchParams?.search;

  const filterValue = searchParams?.filter;
  const channalActive = searchParams?.channel?.replace(/-/g, " ");
  let queryChannel = null;
  let queryStreamLink = null;
  if (channalActive) {
    queryStreamLink = await axios.get(
      `${process.env.BACKEND_SERVER}/streamlink/StreamLinkName`,
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
    axios.get(`${process.env.BACKEND_SERVER}/streamlink`, {
      params: {
        // page: 1,
        // limit: 8,
        page: 1,
        limit: 0,
        mode: "Visible",
        sort: { channelName: 1 },
        language: filterValue,
        searchValue: searchValue,
        or: ["channelName"],
      },
    }),
    axios.get(`${process.env.BACKEND_SERVER}/links`),
  ])
    .then((responses) => {
      // responses is an array of axios responses
      const [chatRules, chatMode, chatFilteredWords, streamLinksData, links] =
        responses;

      // Access the data from each response
      const rulesData = chatRules?.data?.data?.data[0].rules;
      const modeData = chatMode?.data?.data?.data[0];
      const filteredWordsData = chatFilteredWords.data?.data?.data[0].words;
      const streamLinks = streamLinksData.data;
      const social = links.data?.data?.data[0].social;
      const banners = links.data?.data?.data[0].banners;

      return {
        rulesData,
        modeData,
        filteredWordsData,
        streamLinks,
        social,
        banners,
      };
    })
    .catch((error) => {
      // Handle any errors that occurred during any of the requests
      console.error("Error in fetching chat resources:", error);
    });
  // const streamLinks = await axios.get(
  //   `${process.env.BACKEND_SERVER}/streamlink`,
  //   {
  //     params: {
  //       page: 1,
  //       limit: 8,
  //       mode: "Visible",
  //       language: filterValue,
  //       searchValue: searchValue,
  //       or: ["channelName"],
  //     },
  //   }
  // );
  console.log("queryStreamLink", queryStreamLink?.data);

  const channelsServers = {
    channels: data?.streamLinks?.data?.data,
    totalResults: data?.streamLinks?.results,
  };
  // console.log("streamLinks", data?.streamLinks);
  // const channelsServers = channelsServer;
  const playingServer =
    queryStreamLink?.data?.data?.URL ||
    data?.streamLinks?.data?.data[0]?.URL ||
    null;
  const playingServerName =
    queryStreamLink?.data?.data?.channelName ||
    data?.streamLinks?.data?.data[0]?.channelName ||
    null;
  const langs = data?.streamLinks?.allLanguages;
  return (
    <div className={classes["page"]}>
      <ShowingChat
        mode={data?.modeData}
        chatRules={data?.rulesData}
        chatFilteredWords={data?.filteredWordsData}
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
            reportData={{ event: playingServerName, server: "Server 1" }}
            social={data?.social}
            mode={data?.modeData}
            chatRules={data?.rulesData}
            chatFilteredWords={data?.filteredWordsData}
            url={playingServer}
          />
        </div>
        <div className={classes["after-video"]}>
          <div className={classes["vpn"]}>
            {/* <Casino url={data?.banners?.casino} /> */}
            <Advert />
          </div>
          <div className={classes["sort-search-wrapper"]}>
            <Search />
            <NewFilter
              channels={true}
              options={["All Languages", ...langs]}
              filterValue={filterValue ? filterValue : "All Languages"}
            />
          </div>
          <Servers
            channalActive={channalActive}
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
