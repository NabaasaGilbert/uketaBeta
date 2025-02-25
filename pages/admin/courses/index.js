import AdminDashboardEl from '../../../components/adminpage/AdminDashboardEl';
import AdminCoursesEl from '../../../components/adminpages/AdminCoursesEl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useUser from '../../../lib/useUser';
import Head from 'next/head';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Link from 'next/link';

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push('/login');
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    // console.log( user);

    const getCourses = async () => {
      try {
        axios.get('/api/admin/fetchAllCourses').then((res) => {
          setLoading(false);
          return setCourses(res.data.reverse());
        });
      } catch (error) {
        setLoading(false);
        return setError('Error getting courses');
      }
    };

    getCourses();
  }, [session, user]);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="py-5 mt-5 container-fluid container-custom-uketa_">
          <div className="d-flex">
            <h1 className="text-3xl font-bold text-gray-900">
              Courses({courses && courses.length})
            </h1>
            <Link
              href={'/admin/addCourse/'}
              className="defaultButton btn btn-primary mx-5 my-2"
              passHref
            >
              Add A New Course
            </Link>
          </div>
          {error && <div className="alert alert-danger w-100">{error}</div>}
          {loading ? (
            <div className="d-flex w-100 py-5 my-5">
              <Spinner className="mx-auto text-orange" />
            </div>
          ) : (
            <AdminCoursesEl courses={courses} />
          )}
        </div>
      </div>
    </>
  );
}
