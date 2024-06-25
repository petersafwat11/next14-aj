import axios from "axios";
import classes from "./page.module.css";
import PageTitle from "@/app/ui/pageTitle/PageTitle";
import ArticleContent from "@/app/ui/news/articleContent/ArticleContent";
import SocialShare from "@/app/ui/news/share/socialShare/SocialShare";
import Comments from "@/app/ui/news/comments/Comments";
import ProtonVpn from "@/app/ui/protonVpn/ProtonVpn";
import Share from "@/app/ui/news/share/Share";

export const metadata = {
  title: "News | AJ Sports",
};


const Page = async ({ params }) => {
  const newsURL = params.name;
  const newsTitle = newsURL.replace(/%20|-/g, " ");
  const response = await axios.get(
    `${process.env.BACKEND_SERVER}/news/title?title=${encodeURIComponent(
      newsTitle
    )}`
  );
  const newsItem = response?.data?.data?.data;
  const title = newsItem?.title;
  const subNews = newsItem?.subNews;
  const shareUrl = `${process.env.FRONTEND_SERVER}/news/${newsURL}`;
  const quote = "Check out this awesome content!";
  return (
    <>
      {" "}
      <div className={classes["page"]}>
        <PageTitle title={"NEWS"} />
        <ArticleContent title={title} subNews={subNews} />
        <span className={classes["seperator"]}></span>
        <Share shareUrl={shareUrl} quote={quote}/>
        <ProtonVpn />
        <Comments />
      </div>
    </>
  );
};

export default Page;
