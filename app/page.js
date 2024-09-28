import React from "react";
import Image from "next/image";
import Search from "./ui/home-page/search/Search";
import Sports from "./ui/home-page/sports/Sports";
import axios from "axios";
import classes from "./page.module.css";
import OtherMatches from "./ui/home-page/otherMatches/OtherMatches";
import HotMatches from "./ui/home-page/HotMatches/HotMatches";
import NoMatches from "./ui/home-page/noMatches/NoMatches";
import MobileSearch from "./ui/home-page/search/MobileSearch";
import AdsPage from "./ui/ads/AdsComponent";

const Page = async ({ searchParams }) => {
  const sportCategory = searchParams?.category || "football";
  const searchValue = searchParams?.search || "";

  let currentEvents;

  try {
    currentEvents = await axios.get(`${process.env.BACKEND_SERVER}/sports`, {
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
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <div>
        <p>Error loading data. Please try again later. {error.message}</p>
      </div>
    );
  }

  const hotMatches = currentEvents?.data?.hotMatches;

  const otherMatches = {
    total: currentEvents?.data?.results,
    matches: currentEvents?.data?.data,
  };

  return (
    <div className={classes["page"]}>
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
    </div>
  );
};

export default Page;
