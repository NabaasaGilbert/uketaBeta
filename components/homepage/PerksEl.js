import { Col } from "react-bootstrap";
import { BiTime, BiCertification, BiPlayCircle } from "react-icons/bi";
import classes from "./Homepage.module.css";

export default function PerksEl() {
  return (
    <div className={classes.perkSection}>
      <Col sm={4}>
        <BiPlayCircle className={classes.perkIcon} />
        <p>Learn in-demand skills with professional video courses</p>
      </Col>
      <Col sm={4}>
        <BiCertification className={classes.perkIcon} />
        <p>Select from courses taught by real-world experts</p>
      </Col>
      <Col sm={4}>
        <BiTime className={classes.perkIcon} />
        <p>
          Learn at your own pace, with lifetime access on mobile and desktop
        </p>
      </Col>
    </div>
  );
}
