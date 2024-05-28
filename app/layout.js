import { getServerSession } from "next-auth/next";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/store/clientProvider";
import Image from "next/image";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/layout/header/Header";
import Footer from "@/app/ui/layout/footer/Footer";
import { SendMessageButton } from "@/app/ui/layout/sendMessage/SendMessage";
import NewsLetter from "@/app/ui/layout/newsletter/NewsLetter";
import styles from "./layout.module.css";
import Marque from "./ui/marque/Marque";
import Head from "next/head";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AJ Sports | Free Sports Live Streaming",
  description:
    "Home of free live sports streaming. Ajsports offers coverage across all leagues in Full HD. Watch matches & events for soccer, cricket NBA, MLB, NFL, F1 and UFC for free.",
  creator: "Peter Safwat",
  publisher: "Peter Safwat",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body
      //  className={inter.className}
      >
        <section>
          <SendMessageButton />
          <a
            href="https://t.me/ajsportstv"
            target={"_blank"}
            className={styles["telegram-link"]}
            rel="noreferrer"
          >
            <Image
              className={styles["telegram-icon"]}
              src="/svg/layout/telegram-floating.svg"
              alt="telegram-channel"
              width="30"
              height="30"
            />
          </a>
        </section>

        <div className={styles["wrapper"]}>
          <Header />
          <Marque />
          <Provider session={session}> {children}</Provider>
        </div>
        <NewsLetter />
        <Footer />
      </body>
    </html>
  );
}
