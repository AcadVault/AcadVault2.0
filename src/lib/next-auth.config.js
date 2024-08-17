import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
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
    adapter: MongoDBAdapter(clientPromise, { databaseName: "catalogue" }),
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.email.split('@')[0];
            return session;
        }
    }
}

export const auth = NextAuth(authOptions);