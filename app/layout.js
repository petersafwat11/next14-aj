import { getServerSession } from "next-auth/next";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/store/clientProvider";
import Image from "next/image";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/layout/header/Header";
import Footer from "@/app/ui/layout/footer/Footer";
import NewsLetter from "@/app/ui/layout/newsletter/NewsLetter";
import styles from "./layout.module.css";
import Marque from "./ui/marque/Marque";
import GoogleAnalytics from "./lib/googleAnalytics";
import dynamic from "next/dynamic";

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
      <GoogleAnalytics />
      <body
      //  className={inter.className}
      >
        <section>
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
