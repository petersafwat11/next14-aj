import axios from "axios";

export async function fetchEventData(
  dataType,
  matchId,
  sportCategory,
  eventDate
) {
  const dataFetched = await axios.get(
    `${process.env.BACKEND_SERVER}/sports/eventAPIData/${dataType}`,
    {
      params: {
        matchId: matchId,
        sportCategory: sportCategory,
        eventDate: eventDate,
        dataType,
      },
    }
  );
  return dataFetched;
}
