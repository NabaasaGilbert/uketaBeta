import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Spinner } from "react-bootstrap";
import parse from "html-react-parser";
import Link from "next/link";

export default function BlogPage() {
  const router = new useRouter();
  const blogId = router.query.index;
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      axios.get(`/api/admin/fetchBlog?id=${blogId}`).then((res) => {
        if (res.data.status === 200) {
          setBlog(res.data.data);
          return setLoading(false);
        }
      });
    }
  }, [blogId]);

  const data = {
    title: "Test Title",
    description:
      "Welcome to the UKETA eLearning Blog! Explore transformative education, expert insights, and endless learning possibilities. Unleash your potential with UKETA!",
    dateCreated: "21-03-2021",
    image:
      "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg",
    id: 1,
    readTime: 10,
  };

  return (
    <>
      {loading ? (
        <div className="p-5">
          <div className="d-flex p-5">
            <Spinner className="mx-auto" />
          </div>
        </div>
      ) : (
        <div className="my-5 py-5 container-fluid">
          <h2 className=" text-center mt-3 fw-bold">Blog</h2>
          <div className="w-100 d-flex">
            <div className="col-xl-5 col-lg-5 col-6 col-12 mx-auto">
              <img
                src={
                  blog?.image
                    ? blog.image
                    : "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg"
                }
                className="w-100"
              />
            </div>
          </div>
          <div className="container container-custom-uketa p-3">
            <h2>{blog?.title}</h2>
            <div className="d-flex">
              <p className="pr-5">
                <i>Posted: {moment(blog.createdAt).format("LLL")}</i>
              </p>
              <p className="px-2">|</p>
              <p>
                {" "}
                <i>{data.readTime} minute read</i>
              </p>
              {/* <p className="px-2">|</p> */}
              {/* <p> Posted by Admin</p> */}
            </div>
            <p>{parse(blog.description)}</p>
          </div>
          <div className="container container-custom-uketa d-flex justify-content-between">
            <div>
              <Link href={`/admin/blogs`} className="">
                Back To All Blogs
              </Link>
            </div>
            <div className="d-flex">
              <Link
                href={`/admin/editBlog/${blogId}`}
                className="btn btn-success mx-2"
              >
                Edit Blog
              </Link>
              <button
                // href={`/admin/blog/editBlog/${blogId}`}
                className="btn btn-danger"
              >
                Delete Blog
              </button>
            </div>
            {/* <div>Edit Blog</div>
            <div>Delete Blog</div> */}
          </div>
        </div>
      )}
    </>
  );
}
