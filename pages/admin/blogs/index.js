import { useEffect, useState } from 'react';
import { Col, Row, Button, Form, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useUser from '../../../lib/useUser';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import useSWR from 'swr';
import BlogComponent from '../../../components/adminpage/BlogComponent';

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push('/login');
    axios.get('/api/admin/fetchAllBlogs').then((res) => {
      let arr = [...res.data];
      arr.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setBlogs(arr);
      return setLoading(false);
    });
  }, [session, user]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="py-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>

          <div className="">
            <Row className="mb-5">
              <Col sm={6}>
                <p className="sectionSubheader m-0">Create a New Blog</p>
                <Link className="btn btn-success mb-5" href="./createBlog">
                  Create New Blog
                </Link>
                <br />
                <p className="sectionSubheader m-0 mt-5">All Blogs</p>
                <br />
              </Col>
            </Row>
            <div className="d-flex flex-wrap">
              {loading ? (
                <div className="p-5 w-100">
                  <div className="d-flex p-5 w-100">
                    <Spinner className="mx-auto text-orange " />
                  </div>
                </div>
              ) : (
                <>
                  {blogs.length < 1 ? (
                    <div>No Blog found</div>
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
        </div>
      </div>
    </>
  );
}
