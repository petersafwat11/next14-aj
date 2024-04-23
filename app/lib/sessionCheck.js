export const checkSessionValidty = (sessionDate) => {
  if (!sessionDate) {
    return false;
  }

  // Check session expiration
  const isSessionExpired = new Date() > new Date(sessionDate);
  if (isSessionExpired) {
    console.log("expired session");

    return false;
  }
  return true;
};
