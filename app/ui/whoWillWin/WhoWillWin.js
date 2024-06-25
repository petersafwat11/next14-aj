"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./xx.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const WhoWillWin = ({ data, query }) => {
  const cookieName = query?.secondTeamName
    ? `${query?.firstTeamName} vs ${query?.secondTeamName}`
    : query?.teamsTitle;

  const [selectedValue, setSelectedValue] = useState("");
  const [pollsData, setPollsData] = useState({ poll: null, totalVotes: 0 });
  const makeVote = async (voteValue) => {
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_SERVER}/sports/makevote`,
        {
          pollId: data._id,
          voteValue: voteValue,
        }
      );
      setSelectedValue(voteValue);
      setPollsData({
        poll: response?.data?.poll,
        totalVotes: response?.data?.poll?.totalVotes,
      });
      // Set the cookie with the calculated expiration date
      const cookieData = { voteValue: voteValue, ...response.data };
      Cookies.set(cookieName, JSON.stringify(cookieData), {
        expires: 10,
      });

    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    const cookie = Cookies.get(cookieName);
    const stringfyCookie = cookie ? JSON.parse(cookie) : null;
    if (!stringfyCookie) {
      return;
    }
    setSelectedValue(stringfyCookie?.voteValue);
    setPollsData({
      poll: stringfyCookie?.poll,
      totalVotes: stringfyCookie?.poll?.totalVotes,
    });
  }, [cookieName]);
  return (
    <div className={classes["who-will-win"]}>
      {pollsData.poll ? (
        <div className={classes["options"]}>
          {pollsData?.poll?.inputs?.map((item, index) => (
            <div
              key={index}
              style={{
                border:
                  selectedValue === item.value
                    ? "1px solid #005174"
                    : "1px solid transparent",
              }}
              className={classes["option"]}
            >
              <span
                style={{
                  width:
                    item.votes > 0
                      ? `${Math.round(
                          (item.votes * 100) / pollsData.totalVotes,
                          1
                        )}%`
                      : "0%",
                }}
                className={classes["overlay-color-first"]}
              ></span>
              <div className={classes["first"]}>
                <p className={classes["number"]}>1.</p>
                <p className={classes["name"]}>
                  {selectedValue === item.value && (
                    <Image
                      className={classes["check-icon"]}
                      src="/svg/watch/check.svg"
                      alt="check"
                      width="12"
                      height="10"
                    />
                  )}
                  {item.value}
                </p>
              </div>
              <div className={classes["second"]}>
                <p className={classes["votes"]}>{item.votes}</p>
                <p className={classes["percentage"]}>
                  {item.votes > 0
                    ? `${Math.round(
                        (item.votes * 100) / pollsData.totalVotes,
                        1
                      )}%`
                    : "0%"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes["unSelected-options"]}>
          <p className={classes["text"]}>Who will win?</p>
          {data?.inputs &&
            data?.inputs?.length > 0 &&
            data?.inputs.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  makeVote(item?.value);
                }}
                className={classes["unSelected-option"]}
              >
                {item?.value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WhoWillWin;
