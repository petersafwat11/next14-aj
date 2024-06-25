import React from "react";
import classes from "./page.module.css";
import PageTitle from "../ui/pageTitle/PageTitle";
import axios from "axios";
import NewsItem from "../ui/news/item/NewsItem";
import dynamic from "next/dynamic";


const Paginations = dynamic(
  () => import("../ui/news/paginations/Paginations"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "News | AJ Sports",
};


const Page = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;

  const response = await axios.get(`${process.env.BACKEND_SERVER}/news`, {
    params: {
      page: page,
      limit: 10,
    },
  });
  const newsItems = response?.data?.data?.data;
  return (
    <main className={classes["page"]}>
      <PageTitle title={"NEWS"} />

      <div className={classes["wrapper"]}>
        <div className={classes["container"]}>
          <div className={classes["news-items"]}>
            {newsItems &&
              newsItems.length > 0 &&
              newsItems.map((item, index) => (
                <NewsItem
                  key={index}
                  index={index}
                  src={`${process.env.BACKEND_SERVER}/img/news/${item?.coverImage}`}
                  alt={"photo"}
                  heading={item.title}
                  para={item.description}
                />
              ))}
          </div>
        </div>
        <Paginations results={response?.results} page={page} />
      </div>
    </main>
  );
};

export default Page;
