import React from "react";
import Wrapper from "../ui/statistics/wrapper/Wrapper";
import axios from "axios";
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

  return <Wrapper data={response?.data?.data} />;
};

export default Statistics;
