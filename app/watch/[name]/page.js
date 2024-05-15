import classes from "./page.module.css";
import axios from "axios";
import WatchDetailsSingleTeam from "@/app/ui/watch/watchDetailsSingleTeam/WatchDetailsSingleTeam";
import WatchDetails from "@/app/ui/watch/watch-details/WatchDetailsFootball";
import BottomSocial from "@/app/ui/bottomSocial/BottomSocial";
import {
  convertDate,
  determineLive,
  getMatchDate,
} from "@/app/lib/datesFunctions";
import { changeServersFormat } from "@/app/lib/changeServersFormat";
import WhoWillWin from "@/app/ui/whoWillWin/WhoWillWin";
import { getMatchQuery } from "./getMatchQuery";
import ShowingChat from "@/app/ui/showingChat/ShowingChat";

import VideoBody from "@/app/ui/watch/videoBody/VideoBody";
import VideoTop from "@/app/ui/watch/videoTop/VideoTop";
import MatchData from "@/app/ui/watch/watchtaktick/MatchSummey/MatchData";
import Casino from "@/app/ui/casino/Casino";

const Page = async ({ params }) => {
  const query = getMatchQuery(params.name);
  const data = await Promise.all([
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatRules`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatMode`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatFilteredWords`),
    axios.get(`${process.env.BACKEND_SERVER}/chat`, {
      params: {
        limit: 10,
        room: "English (Default)",
        sort: { _id: 1 },
        mode: "normal",
      },
    }),
    await axios.get(`${process.env.BACKEND_SERVER}/sports/teamNames`, {
      params: query,
    }),
    await axios.get(`${process.env.BACKEND_SERVER}/links`, {
      params: {
        fields: "social",
      },
    }),
  ])
    .then((responses) => {
      // responses is an array of axios responses
      const [
        chatRules,
        chatMode,
        chatFilteredWords,
        chatMessages,
        eventData,
        links,
      ] = responses;

      // Access the data from each response
      const rulesData = chatRules?.data?.data?.data[0].rules;
      const modeData = chatMode?.data?.data?.data[0];
      const filteredWordsData = chatFilteredWords.data?.data?.data[0].words;
      const messagesData = chatMessages.data?.data?.data;
      const event = eventData.data;
      const social = links.data?.data?.data[0].social;

      return {
        rulesData,
        modeData,
        filteredWordsData,
        messagesData,
        event,
        social,
      };
    })
    .catch((error) => {
      console.error("Error in fetching chat resources:", error);
    });
  const matchData = data?.event?.data?.data;
  const servers = changeServersFormat(matchData?.servers);
  const playingServer = {
    server: servers[0][Object.keys(servers[0])][0],
    lang: Object.keys(servers[0])[0],
  };
  console.log("matchData", matchData);
  const live = determineLive(matchData?.eventDate);

  return (
    <section className={classes["page"]}>
      <ShowingChat
        mode={data.modeData}
        chatMessages={data.messagesData}
        chatRules={data.rulesData}
        chatFilteredWords={data.filteredWordsData}
      />

      {/* <WatchNavigation page={"Watch"} /> */}
      <div className={classes["container"]}>
        {!query.secondTeamName ? (
          <WatchDetailsSingleTeam
            live={live}
            width={"100"}
            leagueLogo={
              matchData?.leagueLogo === null ||
              matchData?.leagueLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : `${process.env.BACKEND_SERVER}/img/matches/${matchData?.leagueLogo}`
            }
            flagLogo={
              matchData?.flagLogo === null || matchData?.flagLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : `${process.env.BACKEND_SERVER}/img/matches/${matchData?.flagLogo}`
            }
            date={` ${getMatchDate(matchData?.eventDate, true)}- ${
              convertDate(matchData?.eventDate).time
            }`}
            place={matchData?.eventStadium}
            teamName={matchData?.teamsTitle}
          />
        ) : (
          <WatchDetails
            live={live}
            lieageImage={
              matchData?.leagueLogo === null || matchData?.leagueLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : `${process.env.BACKEND_SERVER}/img/matches/${matchData?.leagueLogo}`
            }
            firstTeamImage={
              matchData?.firstTeamLogo === null || matchData?.firstTeamLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : matchData?.firstTeamLogo !== null
                ? `${process.env.BACKEND_SERVER}/img/matches/${matchData?.firstTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            firstTeamName={matchData?.firstTeamName}
            seconteamImage={
              matchData?.secondTeamLogo === null || matchData?.secondTeamLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : matchData?.secondTeamLogo !== null
                ? `${process.env.BACKEND_SERVER}/img/matches/${matchData?.secondTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            seconteamName={matchData?.secondTeamName}
            date={` ${getMatchDate(matchData?.eventDate, true)}- ${
              convertDate(matchData?.eventDate).time
            }`}
            place={matchData?.eventStadium}
            // half={"2nd Half: 47’"}
          />
        )}
        <div className="watch-video-wrapper">
          <VideoTop query={query} lang={playingServer.lang} />
          <VideoBody
            chatMessages={data?.messagesData}
            chatRules={data?.rulesData}
            chatFilteredWords={data?.filteredWordsData}
            social={data?.social}
            url={playingServer?.server?.streamLinkUrl}
            eventDate={matchData?.eventDate}
            playStream={matchData?.playStream}
            eventEnds={matchData?.endedEvent}
            activeServer={playingServer}
            servers={servers}
          />
        </div>
        <div className={classes["bottom"]}>
          <div className={classes["vpn"]}>
            {/* <ProtonVpn /> */}
            <Casino />
          </div>
          <div className={classes["mobile-social"]}>
            <BottomSocial social={data?.social} />
          </div>

          <div className={classes["takticks"]}>
            <MatchData
              customAPi={matchData?.customAPI?.customAPIData}
              eventDate={matchData?.eventDate}
              matchId={matchData?.matchId || null}
              sportCategory={matchData?.sportCategory}
              firstTeamName={matchData?.firstTeamName}
              secondTeamName={matchData?.secondTeamName}
              eventStadium={matchData?.eventStadium}
            />
          </div>
          <div className={classes["casino"]}>
            <Casino />
          </div>
          {matchData?.matchPoll?.enabled && (
            <div className={classes["who-will-win"]}>
              <WhoWillWin query={query} data={matchData?.matchPoll} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
