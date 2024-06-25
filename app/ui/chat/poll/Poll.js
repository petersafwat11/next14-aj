"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import WhoWillWin from "./WhoWillWin";
import classes from "./poll.module.css";
import Cookies from "js-cookie";
import axios from "axios";

const Poll = ({ polls }) => {

  const [selectedValue, setSelectedValue] = useState("");
  const [pollsData, setPollsData] = useState({ poll: null, totalVotes: 0 });
  const makeVote = async (voteValue) => {
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_SERVER}/chat/vote`,
        {
          pollId: polls[0]._id,
          voteValue: voteValue,
        }
      );
      setSelectedValue(voteValue);
      setPollsData({
        poll: response?.data?.poll,
        totalVotes: response?.data?.poll?.totalVotes,
      });
      const expirationDate = new Date(
        new Date().getTime() + remainingTime * 60000
      ); // Convert minutes to milliseconds

      // Set the cookie with the calculated expiration date
      const cookieData = { voteValue: voteValue, ...response.data };
      Cookies.set("chatVote", JSON.stringify(cookieData), {
        expires: expirationDate,
      });

    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    const cookie = Cookies.get("chatVote");
    const stringfyCookie = cookie ? JSON.parse(cookie) : null;
    if (!stringfyCookie) {
      return;
    }
    setSelectedValue(stringfyCookie?.voteValue);
    setPollsData({
      poll: stringfyCookie?.poll,
      totalVotes: stringfyCookie?.poll?.totalVotes,
    });
  }, []);
  const [showPoll, setShowPoll] = useState(false);
  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <p className={classes["poll-maker"]}> Pinned by AJ Sports Admin</p>
        <Image
          className={classes["poll-icon"]}
          alt="pin"
          src="/svg/chat/pin.svg"
          width="15"
          height="15"
        />
      </div>
      <div className={classes["body"]}>
        <h2 className={classes["poll-title"]}>POLL TIME</h2>
        <p className={classes["poll-para"]}>{polls[0]?.question}</p>
      </div>
      {showPoll && (
        <WhoWillWin
          selectedValue={selectedValue}
          pollsData={pollsData}
          makeVote={makeVote}
          pollItems={polls[0]?.inputs}
        />
      )}
      <div className={classes["button-wrapper"]}>
        <button
          onClick={() => {
            setShowPoll(!showPoll);
          }}
          className={classes["show-less"]}
        >
          {showPoll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Poll;
