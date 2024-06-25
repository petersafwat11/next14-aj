import React, { useState } from "react";
import classes from "./reportBtn.module.css";
import { handleMakingReport } from "@/app/lib/reportFunction";
import dynamic from "next/dynamic";
const Popup = dynamic(() => import("../popupWrapper/Popup"), {
  ssr: false,
});
const Report = dynamic(() => import("../report/Report"), {
  ssr: false,
});
const ThanksMessage = dynamic(() => import("../thanksMessage/ThanksMessage"), {
  ssr: false,
});
import { usePathname } from "next/navigation";

const ReportBtn = ({ reportData }) => {
  const pathname = usePathname();
  const shareUrl = `${process.env.FRONTEND_SERVER}${pathname}`;

  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const toggleReport = () => {
    setShowReport(!showReport);
  };
  const toggleThanksMessage = () => {
    setShowThanksMessage(!showThanksMessage);
  };

  const sendReport = async (val) => {
    const data = {
      ...reportData,
      reason: val,
      eventLink: shareUrl,
    };

    await handleMakingReport(data, toggleReport, toggleThanksMessage);
  };

  return (
    <>
      {showThanksMessage && (
        <Popup>
          <ThanksMessage
            showThanksMessage={showThanksMessage}
            setShowThanksMessage={setShowThanksMessage}
          />
        </Popup>
      )}

      {showReport && (
        <Popup>
          <Report handleMakingReport={sendReport} toggleReport={toggleReport} />
        </Popup>
      )}

      <div onClick={toggleReport} className={classes["report-btn"]}>
        <svg
          className={classes["svg"]}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g opacity="0.4" clipPath="url(#clip0_265_5671)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1259 0.908081L17.0897 1.87195C18.3011 3.08337 18.3011 5.06677 17.0897 6.2782L14.5365 8.83142C13.5814 9.78797 12.1444 9.98718 10.9857 9.43494L15.5062 4.91443C15.953 4.46765 15.953 3.73816 15.5062 3.29285L14.6317 2.41834C14.1849 1.97156 13.4569 1.97156 13.0101 2.41834L8.51746 6.90955C8.02381 5.7699 8.23914 4.39002 9.16638 3.46277L11.7211 0.908081C12.9325 -0.303345 14.9144 -0.303345 16.1259 0.908081ZM11.7079 17.1093L12.6425 16.9159L12.0389 14.0023L11.1058 14.1986L11.7079 17.1093ZM5.32849 0.314819L6.25281 0.0863038L6.97791 2.96619L6.05359 3.20056L5.32849 0.314819ZM15.0668 15.4965L15.7303 14.8124L13.5961 12.7411L12.9325 13.4266L15.0668 15.4965ZM17.2289 12.4159L17.475 11.496L14.6039 10.7255L14.3563 11.6469L17.2289 12.4159ZM0.37146 5.9281L0.636597 5.01257L3.49304 5.82556L3.23377 6.74402L0.37146 5.9281ZM1.95935 2.51501L2.63464 1.84119L4.73523 3.94324L4.06287 4.61853L1.95935 2.51501ZM0.907593 16.1263L1.87146 17.0902C3.08289 18.3016 5.06482 18.3016 6.27771 17.0902L8.83093 14.537C9.78748 13.5819 9.9867 12.1449 9.43445 10.9862L4.91394 15.5067C4.46716 15.9535 3.73767 15.9535 3.29236 15.5067L2.41785 14.6322C1.97107 14.1854 1.97107 13.4559 2.41785 13.0092L6.91052 8.51795C5.76941 8.02429 4.39099 8.23962 3.46228 9.16834L0.907593 11.7216C-0.303833 12.933 -0.303833 14.9149 0.907593 16.1263Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_265_5671">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className={classes["text"]}>Report Stream</p>
      </div>
    </>
  );
};

export default ReportBtn;
