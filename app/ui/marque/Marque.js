import React from "react";
import Marquee from "react-fast-marquee";
import classes from "./marque.module.css";
const Marque = ({ domains }) => {
  // const [domains, setDomains] = useState([]);
  // const fetchNewData = useCallback(async (query) => {
  //   try {
  //     const domains = await getData("links", query);
  //     setDomains(response?.data?.data[0]?.domains?.split(" "));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchNewData({ fields: "domains" });
  // }, [fetchNewData]);

  return (
    <div className={classes["xx"]}>
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
