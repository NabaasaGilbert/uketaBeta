import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { Spinner } from 'react-bootstrap';
import parse from "html-react-parser";

export default function Blog() {
  const router = new useRouter();
  const blogId = router.query.blogId;
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
    title: 'Test Title',
    description:
      "Welcome to the UKETA eLearning Blog! Here, we offer a transformative educational experience through our cutting-edge eLearning platform. With a wide range of courses, expert instructors, and interactive features, we provide flexible and accessible learning opportunities for students, professionals, and organizations. Our blog, filled with articles, insights, and practical tips, covers educational trends, innovative teaching methodologies, personal growth, and career development. Join us on this exciting journey as we revolutionize the way knowledge is acquired, shared, and applied. Let's unlock your full potential with UKETA, your gateway to limitless learning possibilities.",
    dateCreated: '21-03-2021',
    image:
      'https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg',
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
        <div className="my-5 py-5 container">         
          <div className="w-100 d-flex">
            <div className="col-xl-8 col-lg-8 col-8 col-12 mx-auto">
              <img
                src={
                  blog.image
                    ? blog.image
                    : 'https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg'
                }
                className="w-100"
              />
            </div>
          </div>
          <div className="container container-custom-uketa p-3">
            <h2>{blog?.title}</h2>
            <div className="d-flex">
              <p className="pr-5">
                <i>Posted: {moment(blog.createdAt).format('LLL')}</i>
              </p>
              <p className="px-2">|</p>
              <p> <i>{data.readTime} minute read</i></p>
              {/* <p className="px-2">|</p> */}
              {/* <p> Posted by Admin</p> */}
            </div>
            <p>{parse(blog.description)}</p>
          </div>
        </div>
      )}
    </>
  );
}
