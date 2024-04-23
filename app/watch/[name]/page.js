import Image from "next/image";
import classes from "./page.module.css";
import axios from "axios";
import WatchDetailsSingleTeam from "@/app/ui/watch/watchDetailsSingleTeam/WatchDetailsSingleTeam";
import WatchDetails from "@/app/ui/watch/watch-details/WatchDetailsFootball";
import WatchNavigation from "@/app/ui/watchNavigation/WatchNavigation";
import SocialIcons from "@/app/ui/whatchShare/SocialIcons";
import BottomSocial from "@/app/ui/bottomSocial/BottomSocial";
import BottomSocialFallback from "@/app/ui/BottomSocial/fallback/BottomSocial";

import ProtonVpn from "@/app/ui/protonVpn/ProtonVpn";
import MatchSummery from "@/app/ui/watch/watchtaktick/MatchSummey/MatchSummery";
import { determineLive, getMatchDate } from "@/app/lib/datesFunctions";
import { changeServersFormat } from "@/app/lib/changeServersFormat";
import WhoWillWin from "@/app/ui/whoWillWin/WhoWillWin";
import { Suspense } from "react";
import { getMatchQuery } from "./getMatchQuery";
import VideoBody from "@/app/ui/watch/videoBody/VideoBody";
const Page = async ({ params }) => {
  const query = getMatchQuery(params.name);
  const response = await axios.get(
    `${process.env.BACKEND_SERVER}/sports/teamNames`,
    { params: query }
  );

  const matchData = response?.data?.data?.data;

  const servers = changeServersFormat(matchData?.servers);
  const playingServer = {
    server: servers[0][Object.keys(servers[0])][0],
    lang: Object.keys(servers[0])[0],
  };
  console.log("servers", Object.keys(servers[0])[0]);
  const live = determineLive(matchData?.eventDate);
  const remainingTime = "1min";

  return (
    <section className={classes["watch-football"]}>
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
                event: query.secondTeamName
                  ? `${query.firstTeamName} vs ${query.secondTeamName}`
                  : query.teamsTitle,
                server: playingServer?.lang,
              }}
            />
          </div>
          <VideoBody
            url={playingServer?.server?.streamLinkUrl}
            eventDate={matchData.eventDate}
            playStream={matchData.playStream}
            activeServer={playingServer}
            servers={servers}
          />
        </div>
        <div className={classes["bottom"]}>
          <div className={classes["vpn"]}>
            <ProtonVpn />
          </div>
          <div className={classes["mobile-social"]}>
            <Suspense fallback={<BottomSocialFallback />}>
              <BottomSocial />
            </Suspense>
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
