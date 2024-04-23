import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { TfiTwitterAlt } from "react-icons/tfi";
import classes from "./bottomSocial.module.css";
const BottomSocial = () => {
  // const links = await axios.get(`${process.env.BACKEND_SERVER}/links`, {
  //   params: {
  //     fields: "social",
  //   },
  // });
  // const social = links.data?.data?.data[0].social;

  return (
    <div className={classes["container"]}>
      <h4 className={classes["text"]}>Our Socials</h4>
      <div className={classes["icons"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={'/'}
        >
          <FaDiscord />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={'/'}
        >
          <TfiTwitterAlt />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={'/'}
        >
          <FaTelegramPlane />
        </a>
      </div>
    </div>
  );
};

export default BottomSocial;
