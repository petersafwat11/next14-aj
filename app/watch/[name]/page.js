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
import Advert from "@/app/ui/advert/Advert";

export const metadata = {
  title: "Watch | AJ Sports",
};

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
        sort: { createdAt: -1 },
        mode: "normal",
      },
    }),
    await axios.get(`${process.env.BACKEND_SERVER}/sports/teamNames`, {
      params: query,
    }),
    await axios.get(`${process.env.BACKEND_SERVER}/links`),
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
      const social = links.data?.data?.data
        ? links.data?.data?.data[0]?.social
        : [];
      const banners = links.data?.data?.data[0].banners;
      return {
        rulesData,
        modeData,
        filteredWordsData,
        messagesData,
        event,
        social,
        banners,
      };
    })
    .catch((error) => {
      console.error("Error in fetching chat resources:", error);
    });

  const matchData = data?.event?.data?.data;
  const servers = changeServersFormat(matchData?.servers);
  const playingServer = {
    server: servers ? servers[0][Object.keys(servers[0])][0] : null,
    lang: servers ? Object.keys(servers[0])[0] : null,
  };
  const live = determineLive(matchData?.eventDate);

  return (
    <section className={classes["page"]}>
      <ShowingChat
        mode={data?.modeData}
        chatMessages={data?.messagesData}
        chatRules={data?.rulesData}
        chatFilteredWords={data?.filteredWordsData}
      />

      {/* <WatchNavigation page={"Watch"} /> */}
      <div className={classes["container"]}>
        {!query.secondTeamName ? (
          <WatchDetailsSingleTeam
            playStream={matchData?.playStream}
            eventEnds={matchData?.endedEvent}
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
            date={matchData?.eventDate}
            place={matchData?.eventStadium}
            teamName={matchData?.teamsTitle}
          />
        ) : (
          <WatchDetails
            playStream={matchData?.playStream}
            eventEnds={matchData?.endedEvent}
            lieageImage={
              matchData?.leagueLogo === null ||
              matchData?.leagueLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : `${process.env.BACKEND_SERVER}/img/matches/${matchData?.leagueLogo}`
            }
            firstTeamImage={
              matchData?.firstTeamLogo === null ||
              matchData?.firstTeamLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : matchData?.firstTeamLogo !== null
                ? `${process.env.BACKEND_SERVER}/img/matches/${matchData?.firstTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            firstTeamName={matchData?.firstTeamName}
            seconteamImage={
              matchData?.secondTeamLogo === null ||
              matchData?.secondTeamLogo === undefined
                ? "/svg/home/default-team-icon.svg"
                : matchData?.secondTeamLogo !== null
                ? `${process.env.BACKEND_SERVER}/img/matches/${matchData?.secondTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            seconteamName={matchData?.secondTeamName}
            date={matchData?.eventDate}
            place={matchData?.eventStadium}
            // half={"2nd Half: 47’"}
          />
        )}
        <div className={classes["watch-video-wrapper"]}>
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
            mode={data?.modeData}
            activeServer={playingServer}
            servers={servers}
            query={query}
            lang={playingServer.lang}
          />
        </div>
        <div className={classes["bottom"]}>
          <div className={classes["vpn"]}>
            <Advert />
          </div>
          <div className={classes["mobile-social"]}>
            <BottomSocial social={data?.social} />
          </div>

          {matchData?.sportCategory !== "f1" && (
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
          )}
          {matchData?.sportCategory !== "f1" && (
            <div className={classes["casino"]}>
              <Advert />
            </div>
          )}
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
