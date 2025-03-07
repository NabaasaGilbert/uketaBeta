import { Col, Row, Button } from "react-bootstrap";
import classes from "./Footer.module.css";
import Form from "react-bootstrap/Form";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiMailSend,
  BiMap,
  BiPhone,
  BiX,
} from "react-icons/bi";
import Link from "next/link";
import CustomLink from "../CustomLink"

export default function FooterEl() {
  return (
    <div className={classes.footerSection}>
      <Row>
        <Col sm={2} className={classes.footerSubsection}>
          <p className={classes.footerHeader}>Students</p>
          <CustomLink href="/login" passHref className={classes.Link}>
            <p>Login</p>
          </CustomLink>
          <CustomLink href="/signup" passHref className={classes.Link}>
            <p>Register</p>
          </CustomLink>
        </Col>
        <Col sm={2} className={classes.footerSubsection}>
          <p className={classes.footerHeader}>Coaches</p>
          <Link href="/coach/login" passHref className={classes.Link}>
            <p>Login</p>
          </Link>
          <Link href="/coach/signup" passHref className={classes.Link}>
            <p>Register</p>
          </Link>
          <div className="pt-5" />
          {/* <p className={classes.footerHeader}>Admin</p>
          <Link href="/admin/login" passHref className={classes.Link}>
            <p>Login</p>
          </Link> */}
        </Col>
        <Col sm={2} className={classes.footerSubsection}>
          <p className={classes.footerHeader}>Quicklinks</p>
          <CustomLink href="/" passHref className={classes.Link}>
            <p>Home</p>
          </CustomLink>
          <CustomLink href="/about" passHref className={classes.Link}>
            <p>About</p>
          </CustomLink>
          <CustomLink href="/courses" passHref className={classes.Link}>
            <p>Courses</p>
          </CustomLink>
          <CustomLink href="/collaborate" passHref className={classes.Link}>
            <p>Collaborate</p>
          </CustomLink>
        </Col>
        <Col sm={3} className={classes.footerSubsection}>
          <p className={classes.footerHeader}>Contact</p>
          <a href="">
            <BiMap /> Plot 1 Water Lane, Naguru, Kampala
          </a>
          <a href="tel:+256709734294">
            <BiPhone />
            {/* +256 772 202 190  */}
            {/* +256 776 906 319 */}
    +256 709 734 294
          </a>
          <a href="mailto:info@uketalearning.com">
            <BiMailSend /> info@uketalearning.com
          </a>
          <div className="d-flex p-3">
            <a
              href="https://www.facebook.com/uketalearning"
              target="_blank"
              className="px-2"
            >
              <img src="/icons/facebook.svg" width={30} height={30} alt="" />
            </a>
            <a
              href="https://twitter.com/UketaLearning"
              target="_blank"
              className="px-2"
            >
              <img src="/icons/x.svg" width={30} height={30} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/company/94841329/admin/feed/posts/"
              target="_blank" className="px-2"
            >
              <img src="/icons/linkedin.svg" width={30} height={30} alt="" />
            </a>
            <a
              href="https://www.instagram.com/uketalearning?igsh=cHRlbXFrdWw3ZHY5&utm_source=qr"
              target="_blank" className="px-2"
            >
              <img src="/icons/instagram.svg" width={30} height={30} alt="" />
            </a>
          </div>
        </Col>
        <Col sm={3} className={classes.footerSubsection}>
          <p className={classes.footerHeader}>Newsletter</p>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="johndoe@example.com"
              className="me-2"
              aria-label="Subscribe"
            />
            <Button variant="outline-warning">Subscribe</Button>
          </Form>
        </Col>
      </Row>
      <div className={classes.copyrightSection}>
        <a href="/">
          <img src="/logo/Uketa Logo White.png" alt="" />
        </a>
        <div>
          <p>
            ©Copyright <strong>Uketa</strong> 2025. All Rights Reserved.
          </p>
          <a
            className={classes.copyrightLink}
            target="_blank"
            href="https://gilbertnabaasa.info/"
          >
            Maintained By Gilbert Nabaasa
          </a>
        </div>
      </div>
    </div>
  );
}
