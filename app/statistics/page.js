import React from "react";
import Wrapper from "../ui/statistics/wrapper/Wrapper";
import axios from "axios";

export const metadata = {
  title: "Statistics | AJ Sports",
};

const Statistics = async () => {
  const response = await axios.get(
    `${process.env.BACKEND_SERVER}/statistics/fixtures`,
    {
      params: {
        id: 39,
        type: "Fixtures",
        week: 1,
      },
    }
  );
  return (
    <div>
      <Wrapper data={response?.data?.data} />
    </div>
  );
};

export default Statistics;
