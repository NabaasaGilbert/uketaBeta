// import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import InstructorCourses from "../../../components/coaches/courses/InstructorCourses";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";

export default function index() {
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
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="py-5 mt-5 container">
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <InstructorCourses />
        </div>
      </div>
    </>
  );
}
