import React from "react";
import classes from "./globalHeader.module.css";
const GlobalHeader = ({ category, changeCategory, categories }) => {
  console.log("categories", categories);
  return (
    <div className={classes["header"]}>
      {categories.map((item, index) => (
        <p
          key={index}
          onClick={() => {
            changeCategory(item);
          }}
          style={{
            borderBottom:
              category == item ? "2px solid #03a1cd" : "2px solid transparent",
            color: category == item ? "#03a1cd" : "inherit",
          }}
          className={classes["header-item"]}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default GlobalHeader;
