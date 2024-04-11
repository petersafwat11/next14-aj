import React from "react";
const GiveAway = async () => {
  const eventData = await getData("giveaway/event");
  const entries = await getData("giveaway/eventEntries", {
    email: "psafwat16@gmail.com",
  });
  console.log(eventData.data.data);

  return (
    <>dsds</>

    // <Wrapper eventData={eventData?.data?.data} entries={entries?.data} />
  );
};

export default GiveAway;
