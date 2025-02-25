import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import CommentsListEl from "../../../components/adminpage/CommentsListEl";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();

  const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    // console.log(session, user);
  }, [session, user]);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
          <p className="sectionSubheader">Manage Comments</p>
          <CommentsListEl />
        </div>
      </div>
    </>
  );
}
