import React from "react";
import Wrapper from "../ui/statistics/wrapper/Wrapper";
import axios from "axios";
const Statistics = async () => {
  const standings = await axios.get(`${process.env.BACKEND_SERVER}/channels`, {
    params: {
      page: 1,
      limit: 8,
      mode: "Visible",
      language: filterValue,
      searchValue: searchValue,
      or: ["channelName"],
    },
  });
const fixtures= 
const results=
  return (
    <Wrapper standings={standings} fixtures={fixtures} results={results} />
  );
};

export default Statistics;
