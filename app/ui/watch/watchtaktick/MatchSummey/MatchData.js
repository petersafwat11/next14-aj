import React from "react";
import MatchSummeryFallback from "./MatchSummeryFallback";
import dynamic from "next/dynamic";

const MatchSummery = dynamic(() => import("./MatchSummery"), {
  loading: () => <MatchSummeryFallback />,
});

const MatchData = ({
  customAPi,
  eventDate,
  matchId,
  sportCategory,
  firstTeamName,
  secondTeamName,
  eventStadium
}) => {
  return (
    <MatchSummery
      customAPi={customAPi}
      eventDate={eventDate}
      matchId={matchId || null}
      sportCategory={sportCategory}
      firstTeamName={firstTeamName}
      secondTeamName={secondTeamName}
      eventStadium={eventStadium}
    />
  );
};

export default MatchData;
