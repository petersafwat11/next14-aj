"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import classes from "./paginations.module.css";
const Paginations = ({ page, results }) => {
  const totalPages = Math.ceil(results / 10);
  const router = useRouter();
  return (
    <div className={classes["paginations"]}>
      <div className={classes["paginations-options"]}>
        <div className={classes["previous"]}>
          <MdKeyboardArrowLeft className={classes["arrow"]} />
          <p
            onClick={() => {
              if (page !== 1) {
                router.push(`/news?page=${page - 1}`);
              }
            }}
            className={classes["prev-text"]}
          >
            Previous
          </p>
        </div>

        {page >= 4 && (
          <p
            onClick={() => {
              router.push(`/news?page=1`);
            }}
            className={classes["paginations-option"]}
          >
            1
          </p>
        )}
        {page >= 5 && (
          <>
            <p>...</p>
          </>
        )}
        {page >= 3 && (
          <p
            onClick={() => {
              router.push(`/news?page=${page - 2}`);
            }}
            className={classes["paginations-option"]}
          >
            {page - 2}
          </p>
        )}
        {page >= 2 && (
          <p
            onClick={() => {
              router.push(`/news?page=${page - 1}`);
            }}
            className={classes["paginations-option"]}
          >
            {page - 1}
          </p>
        )}
        {totalPages >= page && page && (
          <p className={classes["active"]}>{page}</p>
        )}

        {totalPages > page && (
          <p
            onClick={() => {
              router.push(`/news?page=${page + 1}`);
            }}
            className={classes["paginations-option"]}
          >
            {page + 1}
          </p>
        )}
        {totalPages > page + 1 && (
          <p
            onClick={() => {
              router.push(`/news?page=${page + 2}`);
            }}
            className={classes["paginations-option"]}
          >
            {page + 2}
          </p>
        )}
        {page === 1 && totalPages > page + 3 && (
          <p
            onClick={() => {
              router.push(`/news?page=${page + 3}`);
            }}
            className={classes["paginations-option"]}
          >
            {page + 3}
          </p>
        )}
        {((totalPages > page + 3 && page !== 1) ||
          (totalPages > page + 4 && page === 1)) && <p>...</p>}
        {((totalPages > page + 2 && page !== 1) ||
          (totalPages > page + 3 && page === 1)) && (
          <p
            onClick={() => {
              router.push(`/news?page=${totalPages}`);
            }}
            className={classes["paginations-option"]}
          >
            {totalPages}
          </p>
        )}
        <div
          onClick={() => {
            if (page !== totalPages) {
              router.push(`/news?page=${page + 1}`);
            }
          }}
          className={classes["next"]}
        >
          <p className={classes["next-text"]}>Next</p>
          <RiArrowRightSLine className={classes["arrow"]} />
        </div>
      </div>
    </div>
  );
};

export default Paginations;
