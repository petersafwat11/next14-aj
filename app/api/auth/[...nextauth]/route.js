import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import AppleProvider from "next-auth/providers/apple";
import RedditProvider from "next-auth/providers/reddit";
import axios from "axios";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      issuer: process.env.NEXTAUTH_CLIENT_ISSUER,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log("token");
      if (account) {
        // token.id = account.access_token;
        try {
          const signinUser = await axios.post(
            `${process.env.BACKEND_SERVER}/users/regulerUsers`,
            {
              email: token.email,
              name: token.name,
              image: token.picture,
            }
          );
          const databaseUser = signinUser?.data?.data?.data;
          token.name = databaseUser.name;
          token.image = databaseUser.image;
          token.color = databaseUser.color;
          token.provider = account.provider;
        } catch (err) {
          console.log("err happened when authentication, pls try again", err);
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.provider = token.provider;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.color = token.color;
      // session.user.id = token.id;
      // console.log(token);
      return session;
    },
  },
  session: {
    // Set the maxAge property to make the session expire in one day
    maxAge: 86400, // 24 hours in seconds
    strategy: "jwt",
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 1 day
  },
};
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
