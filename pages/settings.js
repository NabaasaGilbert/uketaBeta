import { useEffect } from "react";
import UserCoursesEl from "../components/userpages/UserCoursesEl";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../lib/useUser";
import Head from "next/head";
import UserDashboard from "../components/userpages/UserDashboard";

export default function Settings() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
  }, [session]);

  return (
    <>
      <Head>
        <title>
          My Settings | Uketa Learning - Unlock, Understand, Uplift
        </title>
        <meta
          name="settings"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="My Courses | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/settings" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="mt-5">.</div>
      <div className="text-center p-5 my-5">
        {/* <div>Settings page</div> */}
        <div className="text-orange">
          <marquee>Settings Page. Coming Soon</marquee>
        </div>
      </div>
      {/* <UserDashboard /> */}
      {/* <UserCoursesEl /> */}
    </>
  );
}
