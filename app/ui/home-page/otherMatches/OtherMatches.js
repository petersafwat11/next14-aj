"use client";
import React, { useState } from "react";
import Match from "../match/Match";
import ShowMore from "../../showMore/ShowMore";
import classes from "./otherMatches.module.css";
const OtherMatches = ({ data, searchValue, sportCategory }) => {
  const [otherMatches, setOtherMatches] = useState(data?.matches?.data);
  console.log("data", data?.total, otherMatches.length);

  return (
    <>
      <div>
        {otherMatches.length > 0 &&
          otherMatches?.map((matchData, index) => (
            <Match
              type={"hot-matches"}
              matchData={matchData}
              key={matchData?._id}
              index={index}
              length={otherMatches?.length}
            />
          ))}
      </div>

      {data?.total > otherMatches.length && (
        <div className={classes["show-more-button"]}>
          <ShowMore
            query={{
              limit: 10,
              intialNumber: 20,
              sportCategory: sportCategory,
              sort: { eventDate: 1 },
              searchValue: searchValue,
              or: [
                "teamsTitle",
                "firstTeamName",
                "secondTeamName",
                "eventLeague",
                "eventStadium",
              ],
            }}
            page={"sports"}
            updateState={setOtherMatches}
            oldData={otherMatches}
          />
        </div>
      )}
    </>
  );
};

export default OtherMatches;
