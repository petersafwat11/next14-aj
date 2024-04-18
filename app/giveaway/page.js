import React from "react";
import Wrapper from "../ui/giveAway/wrapper/Wrapper";
import axios from "axios";
const GiveAway = async () => {
  const eventData = await axios.get(
    `${process.env.BACKEND_SERVER}/giveaway/event`
  );
  const entries = await axios.get(
    `${process.env.BACKEND_SERVER}/giveaway/eventEntries`,
    {
      params: {
        email: "psafwat16@gmail.com",
      },
    }
  );
  const social = await axios.get(`${process.env.BACKEND_SERVER}/links`, {
    params: {
      fields: "social",
    },
  });
  const allSocial = social?.data?.data?.data[0]?.social;
  return (
    <Wrapper
      eventData={eventData?.data?.data?.data}
      entries={entries?.data?.data}
      allSocial={allSocial}
    />
  );
};

export default GiveAway;
