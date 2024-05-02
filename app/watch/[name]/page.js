import classes from "./page.module.css";
import axios from "axios";
import WatchDetailsSingleTeam from "@/app/ui/watch/watchDetailsSingleTeam/WatchDetailsSingleTeam";
import WatchDetails from "@/app/ui/watch/watch-details/WatchDetailsFootball";
import WatchNavigation from "@/app/ui/watchNavigation/WatchNavigation";
import SocialIcons from "@/app/ui/whatchShare/SocialIcons";
import BottomSocial from "@/app/ui/bottomSocial/BottomSocial";
import ProtonVpn from "@/app/ui/protonVpn/ProtonVpn";
import MatchSummery from "@/app/ui/watch/watchtaktick/MatchSummey/MatchSummery";
import { determineLive, getMatchDate } from "@/app/lib/datesFunctions";
import { changeServersFormat } from "@/app/lib/changeServersFormat";
import WhoWillWin from "@/app/ui/whoWillWin/WhoWillWin";
import { getMatchQuery } from "./getMatchQuery";
import VideoBody from "@/app/ui/watch/videoBody/VideoBody";
import ShowingChat from "@/app/ui/showingChat/ShowingChat";
const Page = async ({ params }) => {
  const query = getMatchQuery(params.name);
  const data = await Promise.all([
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatRules`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatMode`),
    axios.get(`${process.env.BACKEND_SERVER}/chat/chatFilteredWords`),
    axios.get(`${process.env.BACKEND_SERVER}/chat`, {
      params: {
        limit: 0,
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
  console.log("data?.chatRules", data?.chatRules);
  const live = determineLive(matchData?.eventDate);

  return (
    <section className={classes["watch-football"]}>
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
            leagueLogo={`${process.env.STATIC_SERVER}/img/matches/${matchData?.leagueLogo}`}
            flagLogo={`${process.env.STATIC_SERVER}/img/matches/${matchData?.flagLogo}`}
            date={getMatchDate(matchData?.eventDate)}
            place={matchData?.eventStadium}
            teamName={matchData?.teamsTitle}
          />
        ) : (
          <WatchDetails
            live={live}
            lieageImage={`${process.env.STATIC_SERVER}/img/matches/${matchData?.leagueLogo}`}
            firstTeamImage={
              matchData?.firstTeamLogo !== null
                ? `${process.env.STATIC_SERVER}/img/matches/${matchData?.firstTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            firstTeamName={matchData?.firstTeamName}
            seconteamImage={
              matchData?.secondTeamLogo !== null
                ? `${process.env.STATIC_SERVER}/img/matches/${matchData?.secondTeamLogo}`
                : "/svg/home/default-team-icon.svg"
            }
            seconteamName={matchData?.secondTeamName}
            date={getMatchDate(matchData?.eventDate)}
            place={matchData?.eventStadium}
            // half={"2nd Half: 47’"}
          />
        )}
        <div className="watch-video-wrapper">
          <div className={classes["watch-video-top"]}>
            <div className="navigation">
              <WatchNavigation page={"Sports"} />
            </div>
            <SocialIcons
              reportData={{
                event: query?.secondTeamName
                  ? `${query?.firstTeamName} vs ${query?.secondTeamName}`
                  : query?.teamsTitle,
                server: playingServer?.lang,
              }}
            />
          </div>
          <VideoBody
            chatMessages={data?.messagesData}
            chatRules={data?.rulesData}
            chatFilteredWords={data?.filteredWordsData}
            social={data?.social}
            url={playingServer?.server?.streamLinkUrl}
            eventDate={matchData?.eventDate}
            playStream={matchData?.playStream}
            activeServer={playingServer}
            servers={servers}
          />
        </div>
        <div className={classes["bottom"]}>
          <div className={classes["vpn"]}>
            <ProtonVpn />
          </div>
          <div className={classes["mobile-social"]}>
            <BottomSocial social={data?.social} />
          </div>

          <div className={classes["takticks"]}>
            <MatchSummery
              customAPi={matchData?.customAPI?.customAPIData}
              eventDate={matchData?.eventDate}
              matchId={matchData?.matchId || null}
              sportCategory={matchData?.sportCategory}
              firstTeamName={matchData?.firstTeamName}
              secondTeamName={matchData?.secondTeamName}
            />
          </div>
          {/* <div className={classes["casino"]}>
                <Casino />
              </div> */}
          <div className={classes["who-will-win"]}>
            <WhoWillWin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
