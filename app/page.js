import React from "react";
import { getServerSession } from "next-auth/next";
import { authConfig } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import Matches from "./ui/home-page/HotMatches/HotMatches";
import Search from "./ui/home-page/search/Search";
import ShowMore from "./ui/showMore/ShowMore";
import Sports from "./ui/home-page/sports/Sports";
import axios from "axios";
import classes from "./page.module.css";
import OtherMatches from "./ui/home-page/otherMatches/OtherMatches";
import HotMatches from "./ui/home-page/HotMatches/HotMatches";
import NoMatches from "./ui/home-page/noMatches/NoMatches";
const Page = async ({ searchParams }) => {
  const sportCategory = searchParams?.category || "football";
  const searchValue = searchParams?.search || "";
  const currentEvents = await axios.get(
    `${process.env.BACKEND_SERVER}/sports`,
    {
      params: {
        page: 1,
        limit: 20,
        otherCategory: sportCategory === "others" ? true : false,
        sportCategory: sportCategory === "others" ? undefined : sportCategory,
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

  const session = await getServerSession(authConfig);

  const hotMatches = currentEvents?.data?.hotMatches;
  console.log("hot matches", hotMatches);

  const otherMatches = {
    total: currentEvents?.data?.results,
    matches: currentEvents?.data?.data,
  };
  return (
    <div className={classes["page"]}>
      <div className={classes["search-mobile"]}>
        <input
          className={classes["search-mobile-input"]}
          type="text"
          placeholder="Enter keyword..."
        />
        <button className={classes["search-mobile-button"]}>SEARCH</button>
      </div>
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
          {/* <Matches /> */}
        </section>
      </div>
    </div>
  );
};

export default Page;
