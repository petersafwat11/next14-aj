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

  return (
    <div className={classes['page']}>
      <Wrapper data={response?.data?.data} />
    </div>
  );
};

export default Statistics;
