import { useEffect, useState } from "react";
// import Router from "next/router";
import useSWR from "swr";

export default function useUser({ redirectIfFound = false } = {}) {
  // var userDir;
  const { data: userData, mutate: mutateUser } = useSWR("/api/user");
  const [user, setUser] = useState([]);

  useEffect(() => {
    // console.log(user);
    if (userData) {
      setUser(userData);
    }

    if (
      // If redirectTo is set, redirect if the user was not found.
      (!redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      // Router.push(redirectTo);
    }
  }, [user, userData, redirectIfFound]);

  return { user, mutateUser };
}
