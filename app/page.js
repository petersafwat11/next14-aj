import React from "react";
import Image from "next/image";
import Search from "./ui/home-page/search/Search";
import Sports from "./ui/home-page/sports/Sports";
import axios from "axios";
import classes from "./page.module.css";
import OtherMatches from "./ui/home-page/otherMatches/OtherMatches";
import HotMatches from "./ui/home-page/HotMatches/HotMatches";
import NoMatches from "./ui/home-page/noMatches/NoMatches";
import Script from "next/script";
import MobileSearch from "./ui/home-page/search/MobileSearch";
import AdsPage from "./ui/ads/AdsComponent";
const Page = async ({ searchParams }) => {
  const sportCategory = searchParams?.category || "football";
  const searchValue = searchParams?.search || "";
  const currentEvents = await axios.get(
    `${process.env.BACKEND_SERVER}/sports`,
    {
      params: {
        page: 1,
        limit: 20,
        otherCategory: sportCategory === "others" ? true : undefined,
        sportCategory:
          sportCategory === "others" || sportCategory === "fights"
            ? undefined
            : sportCategory,
        fightsGroup: sportCategory === "fights" ? true : undefined,
        searchValue: searchValue,
        or: [
          "teamsTitle",
          "firstTeamName",
          "secondTeamName",
          "eventLeague",
          "eventStadium",
        ],
        sort: { eventDate: 1 },
      },
    }
  );


  const hotMatches = currentEvents?.data?.hotMatches;

  const otherMatches = {
    total: currentEvents?.data?.results,
    matches: currentEvents?.data?.data,
  };
  return (
    <div className={classes["page"]}>
      {" "}
      <MobileSearch />
      <div className={classes["top-screen"]}>
        <div className={classes["top-screen-live-icon"]}>
          <Image src="/svg/live.svg" alt="live" width="31" height="34" />
        </div>
        <Sports sportCategory={"Football"} />
      </div>
      <div className={classes["matches-container"]}>
        <section className={classes["hot-matches"]}>
          <div className={classes["hot-mathes-top"]}>
            <h2 className={classes["title"]}>HOT MATCHES</h2>
            <Image
              className={classes["hot-matches-icon"]}
              src="/svg/home/hot-matches-icon.svg"
              alt="live"
              width="31"
              height="44"
            />
          </div>
          {hotMatches && hotMatches.length > 0 ? (
            <HotMatches data={hotMatches} />
          ) : (
            <div className={classes["center"]}>
              <NoMatches />
            </div>
          )}
        </section>
        <section className={classes["other-matches"]}>
          <div className={classes["other-matches-title-and-search"]}>
            <h2 className={classes["title"]}>OTHER MATCHES</h2>
            <div className={classes["search-desktop"]}>
              <Search />
            </div>
          </div>
          <OtherMatches
            data={otherMatches}
            searchValue={searchValue}
            sportCategory={sportCategory}
          />
        </section>
      </div>
      <AdsPage />
      {/* <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="//cdn.tapioni.com/asg_embed.js"
        data-spots="451173"
        data-tag="asg"
        data-subid1="%subid1%"
        data-subid2="%subid2%"
      ></Script>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="//cdn.tapioni.com/asg_embed.js"
        data-spots="451172"
        data-tag="asg"
        data-subid1="%subid1%"
        data-subid2="%subid2%"
      ></Script>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="//cdn.tapioni.com/ip-push.js"
        data-spot="451174"
        data-subid1="%subid1%"
      ></Script> */}
    </div>
  );
};

export default Page;
