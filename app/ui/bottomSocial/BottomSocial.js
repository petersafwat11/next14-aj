import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { TfiTwitterAlt } from "react-icons/tfi";
import classes from "./bottomSocial.module.css";
const BottomSocial = ({ social }) => {
  return (
    <div className={classes["container"]}>
      <h4 className={classes["text"]}>Our Socials</h4>
      <div className={classes["icons"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.discord}
        >
          <FaDiscord />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.twitter}
        >
          <TfiTwitterAlt />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.telegram}
        >
          <FaTelegramPlane />
        </a>
      </div>
    </div>
  );
};

export default BottomSocial;
