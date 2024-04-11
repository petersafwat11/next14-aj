import axios from "axios";
import classes from "./page.module.css";
import PageTitle from "@/app/ui/pageTitle/PageTitle";
import ArticleContent from "@/app/ui/news/articleContent/ArticleContent";
import SocialShare from "@/app/ui/news/socialShare/SocialShare";
import Comments from "@/app/ui/news/comments/Comments";
import ProtonVpn from "@/app/ui/protonVpn/ProtonVpn";

const Page = async ({ params }) => {
  console.log("params", params.name);
  const newsURL = params.name;
  const newsTitle = newsURL.replace(/%20|-/g, " ");
  const response = await axios.get(
    `${process.env.BACKEND_SERVER}/news/title?title=${encodeURIComponent(
      newsTitle
    )}`
  );
  const title = response?.data?.data?.data?.title;
  const subNews = response?.data?.data?.data?.subNews;
  const shareUrl = `${process.env.FRONTEND_SERVER}/news/${newsURL}`;
  const quote = "Check out this awesome content!";
  return (
    <>
      {" "}
      <div className={classes["news-article"]}>
        <PageTitle title={"NEWS"} />
        <ArticleContent title={title} subNews={subNews} />
        <span className={classes["seperator"]}></span>
        <SocialShare
          shareUrl={shareUrl}
          quote={quote}
        />
        <ProtonVpn />
        <Comments />
      </div>
    </>
  );
};

export default Page;
