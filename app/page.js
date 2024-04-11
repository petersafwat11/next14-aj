import Image from "next/image";
import classes from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { authConfig } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authConfig);
  console.log("session", session);
  return (
    <main className={classes.main}>
      hi {session ? session.user.name : "null"}
    </main>
  );
}
