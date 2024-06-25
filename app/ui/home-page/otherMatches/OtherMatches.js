"use client";
import React, { useEffect, useState } from "react";
import Match from "../match/Match";
import ShowMore from "../../showMore/ShowMore";
import classes from "./otherMatches.module.css";
import NoMatches from "../noMatches/NoMatches";
const OtherMatches = ({ data, searchValue, sportCategory }) => {
  const [otherMatches, setOtherMatches] = useState(data?.matches?.data);
  useEffect(() => {
    setOtherMatches(data?.matches?.data);
  }, [data]);
  return (
    <>
      <div>
        {otherMatches.length > 0 ? (
          otherMatches?.map((matchData, index) => (
            <Match
              type={"other-matches"}
              matchData={matchData}
              key={matchData?._id}
              index={index}
              length={otherMatches?.length}
            />
          ))
        ) : (
          <div className={classes["center"]}>
            <NoMatches />
          </div>
        )}
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
