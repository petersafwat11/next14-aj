import React from "react";
import Marquee from "react-fast-marquee";
import classes from "./marque.module.css";
const Marque = () => {
  // const domainsResponse = await axios.get(
  //   `${process.env.BACKEND_SERVER}/links`,
  //   {
  //     params: {
  //       fields: "domains",
  //     },
  //   }
  // );
  const domains = [
    "This",
    "is",
    "the",
    "BETA",
    "version",
    "of",
    "our",
    "website,",
    "many",
    "more",
    "features",
    "and",
    "channels",
    "will",
    "be",
    "available",
    "soon.",
    "",
  ];

  return (
    <div className={classes["wrapper"]}>
      <div className={classes["marque-container"]}>
        <Marquee
          speed={20}
          gradientWidth={50}
          gradientColor={[0.2, 0.7, 0.5]}
          gradient={false}
        >
          <div className={classes["marque-container-tag"]}>
            <span>Alternative Domains -</span>
            {domains && domains.map((dom, index) => <p key={index}>{dom}</p>)}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Marque;
