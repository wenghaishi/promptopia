import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import conenctToDb, { connectToDB } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    try {
      await connectToDB();
      const sessionUser = await User.findOne({
        email: profile.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    } catch (error) {}
  },
  async signIn({ profile }) {
    try {
      await connectToDB();
      const userExists = await User.findOne({
        email: profile.email,
      });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.repalce(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
