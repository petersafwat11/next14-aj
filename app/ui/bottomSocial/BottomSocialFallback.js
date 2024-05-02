import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { TfiTwitterAlt } from "react-icons/tfi";
import classes from "./bottomSocial.module.css";
const BottomSocialFallback = () => {
  return (
    <div className={classes["container"]}>
      <h4 className={classes["text"]}>Our Socials</h4>
      <div className={classes["icons"]}>
        <button
          // rel="noreferrer"
          // target="_blank"
          className={classes["link"]}
          // href={"/"}
        >
          <FaDiscord />
        </button>
        <button
          // rel="noreferrer"
          // target="_blank"
          className={classes["link"]}
          // href={"/"}
        >
          <TfiTwitterAlt />
        </button>
        <button
          // rel="noreferrer"
          // target="_blank"
          className={classes["link"]}
          // href={"/"}
        >
          <FaTelegramPlane />
        </button>
      </div>
    </div>
  );
};

export default BottomSocialFallback;
