import AdminDashboardEl from "../../components/adminpage/AdminDashboardEl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../lib/useUser";
import Head from "next/head";

export default function AdminPage() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();

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
        {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null}
      </div>
    </>
  );
}
