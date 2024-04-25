import React from "react";
import classes from "./extendButton.module.css";
const ExtendButton = ({ activeExtendMode }) => {
  return (
    <div onClick={activeExtendMode} className={classes["extend"]}>
      <svg
        className={classes["svg"]}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12.1338 13.9533C11.3735 13.9533 10.7572 14.5696 10.7572 15.3299L10.7572 17.9894L9.3829 17.9869C8.62254 17.9854 8.00499 18.6007 8.00358 19.361C8.00288 19.7412 8.1563 20.0857 8.40498 20.3353L11.1585 23.0888C11.4072 23.3384 11.7459 23.4983 12.1261 23.499C12.5062 23.4997 12.8507 23.3463 13.1003 23.0976L15.8538 20.3441C16.1034 20.0955 16.2633 19.7567 16.264 19.3766C16.2654 18.6162 15.6502 17.9987 14.8899 17.9972L13.5104 17.9946L13.5104 15.33C13.5104 14.5696 12.8941 13.9533 12.1338 13.9533Z"
          stroke="#FFB800"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.1338 11.201C11.3735 11.201 10.7572 10.5847 10.7572 9.82439L10.7572 7.1597L9.37771 7.15709C8.61735 7.15568 8.00212 6.53811 8.00355 5.77778C8.00426 5.3976 8.16418 5.05889 8.41379 4.8102L11.1673 2.05668C11.4169 1.808 11.7614 1.65457 12.1416 1.65528C12.5218 1.65598 12.8604 1.81588 13.1091 2.06549L15.8626 4.81899C16.1113 5.0686 16.2647 5.41307 16.264 5.79325C16.2626 6.55361 15.645 7.16885 14.8847 7.16741L13.5104 7.16483L13.5104 9.82436C13.5104 10.5847 12.8941 11.201 12.1338 11.201Z"
          stroke="#FFB800"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9749 16.4712L20.8954 13.5507C21.4331 13.013 21.4331 12.1413 20.8954 11.6036L17.9749 8.68311"
          stroke="#E0E0E0"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.29261 16.4712L3.37208 13.5507C2.83443 13.013 2.83443 12.1413 3.37208 11.6036L6.29261 8.68311"
          stroke="#E0E0E0"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className={classes["extend-text"]}>Extend Mode</p>
    </div>
  );
};

export default ExtendButton;
