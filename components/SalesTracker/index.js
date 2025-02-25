import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const { ref, email } = router.query;
  if (typeof window !== "undefined") {
    if (ref) {
      localStorage.setItem("referer", ref);
    }
    if (email) {
      localStorage.setItem("refererEmail", email);
    }
  }

  const salesTracker = async () => {
    try {
      const payload = { ref, email };
      axios
        .post("/api/admin/createNewSalesTrackingActivity", payload)
        .then((res) => {});
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    if (ref || email) {
      salesTracker();
    }
  }, [ref, email]);
  return <div></div>;
}
