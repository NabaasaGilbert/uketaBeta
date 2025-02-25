import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./Navbar.module.css";

import {
  BiCartAlt,
  BiAdjust,
  BiLogOut,
  BiGridAlt,
  BiMoney,
  BiUser,
  BiUserVoice,
  BiBriefcase,
  BiChat,
  BiMinusFront,
  BiBook,
  BiCertification,
  BiHome,
  BiReceipt,
  BiCommand,
  BiQuestionMark,
} from "react-icons/bi";
import Link from "next/link";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  cartState,
  courseDataState,
  instructorDataState,
  userCourseDataState,
} from "../../atoms/atoms";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
// import { destroy } from "next-auth/client";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
import useSWR from "swr";
// import { Row, Col } from "react-bootstrap";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";
// import CourseBackupData from "../data/courseData.json";
// import InstructorBackupData from "../data/instructorData.json";
import CustomLink from "../CustomLink";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// preload("/api/courses/allCourses", fetcher);
// preload("/api/courses/allInstructors", fetcher);

function NavbarEl(props) {
  // const CourseBackupInfo = CourseBackupData.courses;
  // const InstructorBackupInfo = InstructorBackupData.instructordata;
  const { user, mutateUser } = useUser();
  const [cart, setCart] = useRecoilState(cartState);
  const { data: session } = useSession();
  // const [show, setShow] = useState(false);
  const setCourseData = useSetRecoilState(courseDataState);
  const setInstructorData = useSetRecoilState(instructorDataState);
  const setUserCourses = useSetRecoilState(userCourseDataState);
  const resetUserCourses = useResetRecoilState(userCourseDataState);

  const { data: Courses } = useSWR("/api/courses/allcourses", fetcher);
  const { data: Instructors } = useSWR("/api/courses/allInstructors", fetcher);

  const handleSignOut = async () => {
    try {
      await fetch("/api/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
    // localStorage.clear();
    // console.log(signOut());
    // signOut();
  };

  async function fetchUserCourseHandler(enteredUserId) {
    const apiResponse = await fetch("/api/user/fetchUserCourses", {
      method: "POST",
      body: JSON.stringify(enteredUserId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setUserCourses(apiResponse.data);
    // router.reload();
  }

  useEffect(() => {
    // console.log(session, user);
    // if (user.isLoggedIn === false && !session) router.push("/login");
    if (user.isLoggedIn === true) {
      fetchUserCourseHandler(user?.user.id);
    }
    if (session) {
      fetchUserCourseHandler(session?.user.email);
    }
  }, [session, user]);

  async function logoutHandler(event) {
    event.preventDefault();
    resetUserCourses();
    localStorage.clear();
    await mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);

    // Redirect to the "/" route
    window.location.href = "/";
  }
  // async function testApiHandler() {
  //   const apiResponse = await fetch("/api/user/addCourseToUser", {
  //     method: "POST",
  //     // body: JSON.stringify(enteredUserData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((f) => f.json());
  //   console.log(apiResponse);
  //   // router.reload();
  // }

  useEffect(() => {
    setInstructorData(Instructors);
  }, [Instructors]);

  useEffect(() => {
    setCourseData(Courses);
  }, [Courses]);

  // preload in effects
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    var localCartData = localStorage.getItem("uketa_cartSession");
    const localCartObject = JSON.parse(localCartData);
    if (localCartData) {
      setCart(localCartObject);
    }
    // driveHandler();
  }, []);

  useEffect(() => {
    if (Object.entries(cart).length != 0) {
      const stringCart = JSON.stringify(cart);
      localStorage.setItem("uketa_cartSession", stringCart);
    } else {
      localStorage.removeItem("uketa_cartSession");
    }
  }, [cart]);
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // console.log(user);

  return (
    <>
      <Navbar
        key="md"
        bg={
          !user.isLoggedIn
            ? "light"
            : user.user.email === "admin@uketa.online"
            ? "dark"
            : user?.user?.role == "instructor"
            ? "orange"
            : "light"
        }
        expand="md"
        fixed="top"
        collapseOnSelect
      >
        <Container fluid className="px-5">
          <Navbar.Brand href="/">
            {user &&
            user !== undefined &&
            user.user &&
            user.user.email === "admin@uketa.online" ? (
              <img
                src="/logo/Uketa Logo White.png"
                className={classes.navbarLogo}
                alt=""
              />
            ) : (
              <img
                src="/logo/Uketa Logo.png"
                className={classes.navbarLogo}
                alt=""
              />
            )}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            className={
              user &&
              user !== undefined &&
              user.user &&
              user?.user?.email === "admin@uketa.online" &&
              "nav-toggler-admin"
            }
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                <img
                  src="/logo/Uketa Logo.png"
                  className={classes.navbarLogo}
                  alt=""
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3 admin-nav">
                {user &&
                  user !== undefined &&
                  user.user &&
                  user?.user?.email === "admin@uketa.online" && (
                    <>
                      <Dropdown>
                        <Dropdown.Toggle variant="dark">
                          Analytics and Transactions
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-dark w-100 ctx-menu">
                          <Dropdown.Item
                            href="/admin/dashboard"
                            className="text-white"
                          >
                            Dashboard
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/discounts"
                            className="text-white"
                          >
                            Discounts
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/payments"
                            className="text-white"
                          >
                            Payments
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/salesPeople"
                            className="text-white"
                          >
                            Sales People
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Dropdown>
                        <Dropdown.Toggle variant="dark">
                          Content and Interaction
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-dark w-100 ctx-menu">
                          <Dropdown.Item
                            href="/admin/courses"
                            className="text-white"
                          >
                            Courses
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/blogs"
                            className="text-white"
                          >
                            Blogs
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/comments"
                            className="text-white"
                          >
                            Comments
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/reviews"
                            className="text-white"
                          >
                            Reviews
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/feedback"
                            className="text-white"
                          >
                            Feedback
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Dropdown>
                        <Dropdown.Toggle variant="dark">
                          User Management
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-dark w-100 ctx-menu">
                          <Dropdown.Item
                            href="/admin/students"
                            className="text-white"
                          >
                            Students
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/coaches"
                            className="text-white"
                          >
                            Coaches
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/salesPeople"
                            className="text-white"
                          >
                            Sales People
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/admin/companies"
                            className="text-white"
                          >
                            Companies
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* <Link href="/admin/dashboard" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Dashboard
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/discounts" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Discounts
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/comments" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Comments
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/reviews" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Reviews
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/courses" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Courses
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/blogs" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Blog
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/students" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Students
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/coaches" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Coaches
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/feedback" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Feedback
                        </Nav.Link>
                      </Link> */}
                      {/* <Link href="/admin/payments" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Payments
                        </Nav.Link>
                      </Link>
                      <Link href="/admin/salesPeople" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink + ` text-white`}>
                          Sales People
                        </Nav.Link>
                      </Link> */}
                    </>
                  )}

                {user && user.user && user.user.role == "instructor" && (
                  <>
                    {" "}
                    <Link href="/coach/dashboard" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Dashboard</Nav.Link>
                    </Link>
                    <Link
                      href={`/coach/courses/${user.user.id}`}
                      passHref
                      legacyBehavior
                    >
                      <Nav.Link className={classes.navLink}>Courses</Nav.Link>
                    </Link>
                    <Link href="/coach/payments" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Payments</Nav.Link>
                    </Link>
                    <Link href="/coach/profile" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>
                        My Profile
                      </Nav.Link>
                    </Link>
                    <Link href="/coach/settings" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Settings</Nav.Link>
                    </Link>
                  </>
                )}

                {user &&
                  user.user &&
                  user.user.role == "student" &&
                  user?.user?.email !== "admin@uketa.online" && (
                    <>
                      {" "}
                      <CustomLink href="/" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>Home</Nav.Link>
                      </CustomLink>
                      <CustomLink href={`/courses`} passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>Courses</Nav.Link>
                      </CustomLink>
                      <CustomLink href={`/mycourses`} passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>
                          My Courses
                        </Nav.Link>
                      </CustomLink>
                      <CustomLink href="/dashboard" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>
                          My Profile
                        </Nav.Link>
                      </CustomLink>
                      <CustomLink href="/certificates" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>
                          My Certificates
                        </Nav.Link>
                      </CustomLink>
                      {/* <Link href="/settings" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>
                          Settings
                        </Nav.Link>
                      </Link> */}
                      <CustomLink href="/blogs" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>Blog</Nav.Link>
                      </CustomLink>
                      <CustomLink href="/faqs" passHref legacyBehavior>
                        <Nav.Link className={classes.navLink}>FAQs</Nav.Link>
                      </CustomLink>
                    </>
                  )}

                {!user.isLoggedIn && (
                  <>
                    <CustomLink href="/" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Home</Nav.Link>
                    </CustomLink>
                    <CustomLink href="/about" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>About</Nav.Link>
                    </CustomLink>
                    <CustomLink href="/courses" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Courses</Nav.Link>
                    </CustomLink>
                    <CustomLink href="/collaborate" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>
                        Collaborate
                      </Nav.Link>
                    </CustomLink>
                    <CustomLink href="/blogs" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>Blog</Nav.Link>
                    </CustomLink>
                    <CustomLink href="/faqs" passHref legacyBehavior>
                      <Nav.Link className={classes.navLink}>FAQs</Nav.Link>
                    </CustomLink>
                  </>
                )}

                {/* <Nav.Link className={classes.navLink} href="/resources">
                Resources
              </Nav.Link> */}
                {/* <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              </Nav>
              {/* <Button
                className={classes.navButton}
                onClick={() => testApiHandler()}
              >
                Test Api
              </Button> */}
              {/* {session?.user.name === null ? (
                <Button className="defaultButton me-5" onClick={handleShow}>
                  Complete Account Info
                </Button>
              ) : null} */}

              {/* <NavDropdown
                title={`Test Logout`}
                // ti
                id="basic-nav-dropdown"
                className={classes.Username}
                // className="text-white"
              >
                <Link href="/dashboard" passHref legacyBehavior>
                  <NavDropdown.Item>
                    <BiGridAlt /> Dashboard
                  </NavDropdown.Item>
                </Link>
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleSignOut()}>
                  <BiLogOut /> Logout
                </NavDropdown.Item>
              </NavDropdown> */}

              {/* {user && user.user && user.user.role == 'student' && (
                <NavDropdown
                  title={user.user.name}
                  id="basic-nav-dropdown"
                  className={classes.Username}
                >
                  <Link href="/dashboard" passHref legacyBehavior>
                    <NavDropdown.Item>
                      <BiGridAlt /> Dashboard
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => signOut()}>
                    <BiLogOut /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )} */}

              {/* {user?.isLoggedIn === true && user?.user.name === null ? (
                <Button className="defaultButton me-5" onClick={handleShow}>
                  Complete Account Info
                </Button>
              ) : null} */}

              {/* {user?.isLoggedIn (
                <NavDropdown
                  title={user.user.name}
                  id="basic-nav-dropdown"
                  className={
                    user &&
                    user !== undefined &&
                    user.user &&
                    user.user.email === "admin@uketa.online"
                      ? "text-white mr-5"
                      : classes.Username
                  }
                >
                  {user?.user.email !== "admin@uketa.online" ? (
                    <>                      
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/dashboard" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiAdjust /> Dashboard
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/discounts" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiMinusFront /> Discounts
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/comments" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiChat /> Comments
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/courses" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiBriefcase /> Courses
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/students" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiUser /> Students
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/coaches" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiUserVoice /> Coaches
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/payments" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiMoney /> Payments
                        </NavDropdown.Item>
                      </Link>                      
                      <NavDropdown.Divider className="my-0" />
                      <NavDropdown.Item
                        onClick={async (e) => logoutHandler(e)}
                        className="bg-dark text-white py-2"
                      >
                        <BiLogOut /> Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" passHref legacyBehavior>
                        <NavDropdown.Item>
                          <BiGridAlt /> Dashboard
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item onClick={async (e) => logoutHandler(e)}>
                        <BiLogOut /> Logout
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              ) } */}

              {user?.isLoggedIn ? (
                <NavDropdown
                  title={
                    user.user.role == "instructor"
                      ? `Hi Instructor ${user.user.instructor}`
                      : user.user.name
                  }
                  id="basic-nav-dropdown"
                  className={
                    user &&
                    user !== undefined &&
                    user.user &&
                    user?.user?.email === "admin@uketa.online"
                      ? "mr-5 admin-nav-item"
                      : classes.Username
                  }
                >
                  {user?.user && user?.user?.email == "admin@uketa.online" ? (
                    <>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/dashboard" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiAdjust /> Dashboard
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/discounts" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiMinusFront /> Discounts
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/comments" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiChat /> Comments
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/reviews" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiChat /> Reviews
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/courses" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiBriefcase /> Courses
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/blogs" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiBriefcase /> Blog
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/students" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiUser /> Students
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/coaches" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiUserVoice /> Coaches
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/feedback" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiUserVoice /> Feedback
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/payments" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiMoney /> Payments
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <Link href="/admin/salesPeople" passHref legacyBehavior>
                        <NavDropdown.Item className="bg-dark text-white py-2">
                          <BiMoney /> Sales People
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider className="my-0" />
                      <NavDropdown.Item
                        onClick={async (e) => logoutHandler(e)}
                        className="bg-dark text-white py-2"
                      >
                        <BiLogOut /> Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      {user?.user && user?.user?.role == "instructor" ? (
                        <>
                          <Link href="/coach/dashboard" passHref legacyBehavior>
                            <NavDropdown.Item className="bg-orange py-2 fw-bold">
                              <BiGridAlt /> Dashboard
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          {/* <Link href="/coach/courses/[instructorId]" passHref legacyBehavior> */}
                          <Link
                            href={`/coach/courses/${user.user.id}`}
                            passHref
                            legacyBehavior
                          >
                            <NavDropdown.Item className="bg-orange py-2 fw-bold">
                              <BiBriefcase /> Courses
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/coach/payments" passHref legacyBehavior>
                            <NavDropdown.Item className="bg-orange py-2 fw-bold">
                              <BiBriefcase /> Payments
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/coach/profile" passHref legacyBehavior>
                            <NavDropdown.Item className="bg-orange py-2 fw-bold">
                              <BiBriefcase /> My Profile
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/coach/settings" passHref legacyBehavior>
                            <NavDropdown.Item className="bg-orange py-2 fw-bold">
                              <BiBriefcase /> Settings
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <NavDropdown.Item
                            className="bg-orange py-2 fw-bold"
                            onClick={async (e) => logoutHandler(e)}
                          >
                            <BiLogOut /> Logout
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <>
                          <Link href="/" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiHome /> Home
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/courses" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiReceipt /> Courses
                            </NavDropdown.Item>
                          </Link>

                          <NavDropdown.Divider className="my-0" />
                          <Link href="/mycourses" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiCommand /> My Courses
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/dashboard" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiUser /> My Profile
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/certificates" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiCertification /> My Certificates
                            </NavDropdown.Item>
                          </Link>
                          {/* <NavDropdown.Divider className="my-0" />
                          <Link href="/settings" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiGridAlt /> Settings
                            </NavDropdown.Item>
                          </Link> */}
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/blog" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiBook /> Blog
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <Link href="/faqs" passHref legacyBehavior>
                            <NavDropdown.Item>
                              <BiQuestionMark /> FAQs
                            </NavDropdown.Item>
                          </Link>
                          <NavDropdown.Divider className="my-0" />
                          <NavDropdown.Item
                            onClick={async (e) => logoutHandler(e)}
                          >
                            <BiLogOut /> Logout
                          </NavDropdown.Item>
                        </>
                      )}
                    </>
                  )}
                </NavDropdown>
              ) : null}

              {!session && user?.isLoggedIn === false ? (
                <>
                  {/* <Button
                    className={classes.navButton}
                    onClick={() => signIn()}
                  >
                    Sign-up
                  </Button> */}
                  <CustomLink href="/signup" passHref legacyBehavior>
                    <Nav.Link>
                      <Button className={classes.navButton}>Sign-up</Button>
                    </Nav.Link>
                  </CustomLink>
                  <CustomLink href="/login" passHref legacyBehavior>
                    <Nav.Link>
                      <Button className={classes.navButton}>Login</Button>
                    </Nav.Link>
                  </CustomLink>
                </>
              ) : null}

              {user &&
              user !== undefined &&
              user.user &&
              user.user.email === "admin@uketa.online" ? (
                <></>
              ) : (
                <Link href="/cart/" passHref legacyBehavior>
                  <Nav.Link>
                    <Button className={classes.cartButton}>
                      <BiCartAlt />
                      <span
                        className={
                          Object.keys(cart).length === 0
                            ? classes.hideCounter
                            : classes.showCounter
                        }
                      >
                        {Object.keys(cart).length}
                      </span>
                    </Button>
                  </Nav.Link>
                </Link>
              )}

              {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Account Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={nameSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                ref={nameInputRef}
                type="text"
                placeholder="Angel Agaba"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="addUserFormPass">
              <Form.Label>
                <span>* </span>Password:
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                // disabled={!UserData ? false : true}
                // required={UserData != null ? false : true}/
                ref={passwordInputRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="addUserFormConfPass">
              <Form.Label>
                <span>* </span>Confirm Password:{" "}
                {passwordState === false
                  ? "(Password does not match)"
                  : "(Password Matches)"}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter Password"
                className={
                  passwordState === false
                    ? classes.FailedPassword
                    : classes.SuccessPassword
                }
                // required={UserData != null ? false : true}
                // disabled={!UserData ? false : true}
                // variant={passwordState === false ? null : "success"}
                ref={confirmPasswordInputRef}
                onChange={(e) =>
                  e.currentTarget.value === passwordInputRef.current.value
                    ? setPasswordState(true)
                    : setPasswordState(false)
                }
              />
            </Form.Group>

            <Form.Group
              // variant="bordered-success"
              className="mb-3"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailInputRef}
                type="text"
                value={!session ? null : session.user.email}
                disabled
              />
            </Form.Group>
            <Button className="defaultButton" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default NavbarEl;

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/courses/allcourses");
//   const courses = await res.json();
//   return {
//     props: {
//       courses,
//     },
//   };
// }
