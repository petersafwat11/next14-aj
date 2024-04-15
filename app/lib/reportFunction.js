import axios from "axios";

export const handleMakingReport = async (reportData, toggleReport, toggleThanksMessage) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/reportedLinks`,
        reportData
      );
      // console.log("response", response);
      toggleReport();
      toggleThanksMessage()

    } catch (err) {
      console.log("err", err);
    }
  };
