import React from "react";
import classes from './page.module.css'
import UnderDevelopment from "../ui/underDevelopment/page/UnderDevelopment";

export const metadata = {
  title: "GiveAway | AJ Sports",
};


const GiveAway = async () => {
  // const eventData = await axios.get(
  //   `${process.env.BACKEND_SERVER}/giveaway/event`
  // );
  // const entries = await axios.get(
  //   `${process.env.BACKEND_SERVER}/giveaway/eventEntries`,
  //   {
  //     params: {
  //       email: "psafwat16@gmail.com",
  //     },
  //   }
  // );
  // const social = await axios.get(`${process.env.BACKEND_SERVER}/links`, {
  //   params: {
  //     fields: "social",
  //   },
  // });
  // const allSocial = social?.data?.data?.data[0]?.social;
  return (
    <div className={classes['page']}>
    <UnderDevelopment />
    </div>

    // <Wrapper
    //   eventData={eventData?.data?.data?.data}
    //   entries={entries?.data?.data}
    //   allSocial={allSocial}
    // />
  );
};

export default GiveAway;
