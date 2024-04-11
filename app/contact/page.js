import React from "react";
import classes from "./page.module.css";
import ContactForm from "../ui/contactUS/contactForm/ContactForm";
import ReachUs from "../ui/contactUS/reachUs/ReachUs";

const Page = () => {
  return (
    <section className={classes["contact"]}>
      <h2 className={classes["heading"]}>Contact Us</h2>
      <ContactForm />
      <ReachUs />
    </section>
  );
};

export default Page;
