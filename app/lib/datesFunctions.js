export const getMatchDate = (dateString, dateText) => {
  const date = new Date(dateString);

  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const MatchDateFormat = month + " " + day + " - " + hours + ":" + minutes;
  const dateTextFormat = month + " " + day;
  if (dateText) {
    return dateTextFormat;
  }
  return MatchDateFormat;
};
export const calcRemainingTime = (dateString, pricingFormat) => {
  const targetDate = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  let diff = targetDate.getTime() - now.getTime();
  if (diff < 0) {
    return false;
  }

  // Convert the difference to days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);

  const secs = Math.floor(diff / 1000);

  // Format the remaining time as desired
  let formattedRemainingTime;
  if (pricingFormat && days >= 1) {
    formattedRemainingTime =
      days + " days : " + hours + " hrs : " + mins + " mins";
    return formattedRemainingTime;
  }

  if (days >= 1) {
    formattedRemainingTime =
      days + "d " + hours + "h " + mins + "m " + secs + "s";
    return formattedRemainingTime;
  }
  if (pricingFormat) {
    formattedRemainingTime = hours + " hrs : " + mins + " mins";
    return formattedRemainingTime;
  }
  formattedRemainingTime = hours + "h " + mins + "m " + secs + "s";
  return formattedRemainingTime;
};
export const determineLive = (dateString) => {
  // Convert the input date string to a Date object
  const date = new Date(dateString);

  // Get the current date and time in the user's timezone
  const now = new Date();

  // Compare the two dates
  return now.getTime() >= date.getTime();
};
export const convertDate = (dateStr) => {
  const dateOj = new Date(dateStr);
  // const year = dateOj.getFullYear();
  // const month = (dateOj.getMonth() + 1).toString().padStart(2, "0");
  // const day = dateOj.getDate().toString().padStart(2, "0");
  const hours = dateOj.getHours().toString().padStart(2, "0");
  const minutes = dateOj.getMinutes().toString().padStart(2, "0");
  // let date = `${year}-${month}-${day}` || 1;
  let time = `${hours}:${minutes}` || 2;

  return { 
    // date, 
    time };
};
export const getDateDifference = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (daysDifference > 0) {
    return { num: daysDifference, unit: "Days" };
  } else {
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return { num: hoursDifference, unit: "Hours" };
  }
};
export const groupEventsByDate = (array) => {
  const userTimeZoneOffset = new Date().getTimezoneOffset();

  const groupedFixtures = array.reduce((grouped, fixture) => {
    const date = new Date(fixture.fixture.date);

    // Adjust the date based on the user's timezone offset
    const adjustedDate = new Date(date.getTime());

    const dateKey = adjustedDate.toISOString().split("T")[0]; // Format the adjusted date

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    // Create a new object with the adjusted date key
    const adjustedFixture = { ...fixture, adjustedDateKey: adjustedDate };

    grouped[dateKey].push(adjustedFixture);

    return grouped;
  }, {});

  const arrayOfArrays = Object.values(groupedFixtures).sort(
    (a, b) => a[0].adjustedDateKey - b[0].adjustedDateKey
  );

  return arrayOfArrays;
};
export const getTimeRemainingInMinutes = (timeInZeroTimezone, minutesToAdd) => {
  if (!timeInZeroTimezone || !minutesToAdd) {
    return false;
  }
  // Convert timeInZeroTimezone to milliseconds
  const targetTime = new Date(timeInZeroTimezone).getTime();

  // Add minutes to the target time
  const newTargetTime = targetTime + minutesToAdd * 60 * 1000;

  // Get current time in milliseconds
  const currentTime = new Date().getTime();

  // Calculate the difference in milliseconds
  const timeDifference = newTargetTime - currentTime;

  // Convert difference to minutes
  const timeRemainingInMinutes = Math.round(timeDifference / (1000 * 60));

  // Return time remaining in minutes if it's positive, otherwise return false

  return timeRemainingInMinutes >= 0 ? timeRemainingInMinutes : false;
};
