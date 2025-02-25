import { Col, Row, Button, Form, Table } from "react-bootstrap";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";

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

        <div className="py-5 mt-5 container">
          <h1 className="text-3xl font-bold text-gray-900">Logout</h1>
        
        </div>
      </div>
    </>
  );
}
