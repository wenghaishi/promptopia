import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import conenctToDb, { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDB();
      
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
