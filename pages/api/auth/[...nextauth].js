import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Customize the login page if needed
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure redirect after login
      return baseUrl;
    },
  },
});
