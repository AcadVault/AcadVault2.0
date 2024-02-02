import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Redirecter from "@/components/Redirecter";
import Navbar from "@/components/NavBar";
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
  const _isResourceManager =
    session && session.user && (await isResourceManager(session.user.id));
  return (
    <html lang="en">
      <body className={font.className}>
        <Analytics />
        <SpeedInsights />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="flex h-full w-full bg-primary pt-[40%]">
            <div className="absolute max-sm:hidden left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="mx-auto -mt-[150px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(0,0,0,0))]"></div>
            <div className="absolute max-sm:hidden right-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          </div>
        </div>
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
