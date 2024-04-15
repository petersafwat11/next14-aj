import Image from "next/image";
import classes from "./page.module.css";
import axios from "axios";
import WatchDetailsSingleTeam from "@/app/ui/watch/watchDetailsSingleTeam/WatchDetailsSingleTeam";
import WatchDetails from "@/app/ui/watch/watch-details/WatchDetailsFootball";
import WatchNavigation from "@/app/ui/watchNavigation/WatchNavigation";
import SocialIcons from "@/app/ui/whatchShare/SocialIcons";
import HlcPlayer from "@/app/ui/hlcPlayer/HlcPlayer";
import EventCountDown from "@/app/ui/eventCoutdown/EventCountDown";
import BottomSocial from "@/app/ui/bottomSocial/BottomSocial";
import ServersButtonsMobile from "@/app/ui/watch/serverButtons/serversButtonsMobile/ServersButtonsMobile";
import ServersButtons from "@/app/ui/watch/serverButtons/ServersButtons";
import ProtonVpn from "@/app/ui/protonVpn/ProtonVpn";
import MatchSummery from "@/app/ui/watch/watchtaktick/MatchSummey/MatchSummery";
import { determineLive, getMatchDate } from "@/app/lib/datesFunctions";
import { changeServersFormat } from "@/app/lib/changeServersFormat";
import WhoWillWin from "@/app/ui/whoWillWin/WhoWillWin";
const Page = async ({ params }) => {
  const parseTeamNames = (str) => {
    const decodedStr = decodeURIComponent(str.replace(/-/g, "%20"));
    const [firstTeamName, secondTeamName] = decodedStr.split(/VS|vs|Vs|vS/);
    return { firstTeamName, secondTeamName };
  };
  const { firstTeamName, secondTeamName } = parseTeamNames(params.name);
  let query;
  if (firstTeamName && secondTeamName) {
    query = {
      firstTeamName,
      secondTeamName,
    };
  } else {
    query = {
      teamsTitle: firstTeamName,
    };
  }
  const response = await axios.get(
    `${process.env.BACKEND_SERVER}/sports/teamNames`,
    { params: query }
  );

  const matchData = response?.data?.data?.data;
  const social = await axios.get(`${process.env.BACKEND_SERVER}/links`, {
    params: {
      fields: "social",
    },
  });
  const Allsocial = social.data?.data?.data[0].social;

  const servers = changeServersFormat(matchData?.servers);
  const playingServer = {
    server: "",
    lang: "english",
    // server: data?.servers[0][Object.keys(data?.servers[0])][0],
    // lang: Object.keys(data?.servers[0])[0],
  };
  const live = determineLive(matchData?.eventDate);
  const remainingTime = "1min";

  return (
    <section className={classes["watch-football"]}>
      {/* <WatchNavigation page={"Watch"} /> */}
      <div className={classes["container"]}>
        {!firstTeamName && secondTeamName ? (
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
            <WatchNavigation page={"Watch"} />
            <SocialIcons playingServerName={"liverpool"} />
          </div>

          <div id="my-root-div" className="watch-video">
            {live ? (
              <HlcPlayer url={playingServer?.server?.streamLinkUrl} />
            ) : !live ? (
              <EventCountDown
                eventDate={matchData?.eventDate}
                remainingTime={remainingTime}
              />
            ) : (
              ""
            )}
            {/* <PlayerContainer /> */}
          </div>
          <div className={classes["watch-video-wrapper-bottom"]}>
            <div className={classes["social-links-desktop"]}>
              <BottomSocial />
            </div>
            {/* <ServersButtonsMobile
              playingServerLang={playingServer?.lang}
              // handleServerClicks={handleServerClicks}
              servers={matchData?.servers}
              notLive={!live}
            />
 */}
            <div className={classes["modes-icons"]}>
              <div className={classes["icon-div"]}>
                <Image
                  className={classes["threat-mode-icon"]}
                  src="/svg/watch/threat-mode.svg"
                  alt="threat-mode"
                  height={18}
                  width={18}
                />
              </div>
              <div className={classes["icon-div"]}>
                <Image
                  className={classes["threat-mode-icon"]}
                  src="/svg/watch/extend.svg"
                  alt="extend-mode"
                  height={15}
                  width={15}
                />
              </div>
            </div>
          </div>
          <div className={classes["servers"]}>
            <ServersButtons
              notLive={!live}
              playingServerLang={playingServer?.lang}
              // handleServerClicks={handleServerClicks}
              servers={servers}
            />
          </div>
        </div>
        <div className={classes["bottom"]}>
          <div className={classes["vpn"]}>
            <ProtonVpn />
          </div>
          <BottomSocial social={Allsocial} />

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
