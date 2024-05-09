import React from "react";
import classes from "./MatchSummery.module.css";
import UnderDevelopment from "@/app/ui/underDevelopment/component/underDevelopment";
const MatchSummeryFallback = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}></div>
      <UnderDevelopment
        title={"match data will be available soon"}
        message={"Please share this link with friends and family until then"}
      />
    </div>
  );
};

export default MatchSummeryFallback;
