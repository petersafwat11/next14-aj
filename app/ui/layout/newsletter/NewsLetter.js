import axios from "axios";
import classes from "./newsLetter.module.css";
import Link from "next/link";
const NewsLetter = () => {
  const onSubmit = async (formData) => {
    "use server";
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/newsletter`,
        { email: formData.get("email") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error", error);
      // notify
    }
  };

  return (
    <div className={classes["news-letter"]}>
      <div className={classes["container"]}>
        <div className={classes["news-letter-first"]}>
          <h3 className={classes["title"]}>
            Get Notified for Every Major Event that takes Place!
          </h3>
          <p className={classes["para"]}>
            Sign up to our email newsletter to receive regular updates on all
            the major events that arise, so you never miss out!
          </p>
        </div>
        <div className={classes["news-letter-second"]}>
          <form action={onSubmit} className={classes["notify"]}>
            <input
              name="email"
              className={classes["notify-input"]}
              type="email"
              placeholder="Enter email address"
            />
            <button type="submit" className={classes["notify-button"]}>
              Notify me
            </button>
          </form>
          <p className={classes["news-letter-second-para"]}>
            We care about the protection of your data. read our{" "}
            <Link href="/privacy-policy">Privacy policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
