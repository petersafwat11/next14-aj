"use client";
import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import classes from "./showMore.module.css";
import axios from "axios";
const ShowMore = ({ query, page, updateState, oldData }) => {
  const [paginationNum, setPaginationNum] = useState(1);

  const showMoreHandeler = async () => {
    const num = paginationNum;
    setPaginationNum(paginationNum + 1);
    const updatedQuery = {
      ...query,
      skip: query.intialNumber + (num - 1) * query.limit,
    };
    delete updatedQuery.intialNumber;
    try {
      const response = await axios.get(
        `${process.env.BACKEND_SERVER}/${page}`,
        { params: updatedQuery }
      );
      updateState([...oldData, ...response.data.data.data]);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div onClick={showMoreHandeler} className={classes["container"]}>
      Show more
      <div className={classes["arrow-wrapper"]}>
        <RiArrowDownSLine className={classes["arrow"]} />
      </div>
    </div>
  );
};

export default ShowMore;
