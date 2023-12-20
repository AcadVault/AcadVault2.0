import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { clientPromise } from "@/lib/mongodb.config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=daiict.ac.in",
    })
  ],
  adapter: MongoDBAdapter(clientPromise, { databaseName: "nextauth" }),
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }