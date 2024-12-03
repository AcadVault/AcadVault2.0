import "./globals.css";
import SessionProvider from "@/components/(layout)/SessionProvider";
import Redirecter from "@/components/(layout)/Redirecter";
import Navbar from "@/components/(layout)/NavBar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isResourceManager, getSession } from "@/lib/server-helper-functions";
import { Heebo as Font } from "next/font/google";

export const metadata = {
    title: "AcadVault2.0",
    description: "A living open-source repository of Academic Resources for DA-IICT",
}

const font = Font({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
    const session = await getSession();
    const _isResourceManager = session && session.user && (await isResourceManager(session.user.id));

    return (
        <html lang="en">
            <body className={`${font.className} bg-[#F9FAFB]`}>
                <Analytics />
                <SpeedInsights />
                <Toaster position="top-center" reverseOrder={false} />
                <SessionProvider session={session}>
                    <Redirecter session={session} isResourceManager={_isResourceManager}>
                        <Navbar isResourceManager={_isResourceManager} session={session} />
                        {children}
                    </Redirecter>
                </SessionProvider>
            </body>
        </html>
    );
}