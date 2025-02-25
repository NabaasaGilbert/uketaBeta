import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./Blogs.module.css";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import BlogComponent from "./BlogComponent";
import Link from "next/link";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

export default function CategoriesEl() {
  const router = new useRouter();
  const currPage = router.pathname;

  const { data: session } = useSession();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/fetchAllBlogs").then((res) => {
      let arr = [...res.data];
      arr.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setBlogs(arr);
      return setLoading(false);
    });
  }, [session, user]);

  const data = {
    title: "Test Title",
    description:
      "Welcome to the UKETA eLearning Blog! Explore transformative education, expert insights, and endless learning possibilities. Unleash your potential with UKETA!",
    dateCreated: "21-03-2021",
    image:
      "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg",
    id: 1,
  };

  return (
    <div className="my-5 py-5 container container-custom-uketa">
      <h2 className=" text-center mt-3 fw-bold">Blogs</h2>
      <div className="w-100 text-center p-3 d-flex">
        <p className="col-xl-8 col-lg-8 col-10 col-12 mx-auto">
          <p className="my-1">
            Welcome to the UKETA eLearning Blog! Explore transformative
            education, expert insights, and endless learning possibilities.
            Unleash your potential with UKETA!
          </p>
        </p>
      </div>
      <div className="d-flex flex-wrap">
        {loading ? (
          <div className="d-flex w-100">
            <Spinner className="mx-auto text-orange" />
          </div>
        ) : (
          <>
            {blogs.length < 1 ? (
              <div className="d-flex w-100">
                <div className="alert alert-danger text-center mx-auto">
                  No Blog found
                </div>
              </div>
            ) : (
              <>
                {blogs.map((blog) => {
                  return (
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-12 p-2"
                      key={blog.id}
                    >
                      <BlogComponent data={blog} />
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
