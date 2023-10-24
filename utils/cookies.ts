export const addLoggedInToCookies = () => {
  const timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
  const date = new Date();

  const expiryTime = parseInt(String(date.getTime())) + timeToAdd;
  date.setTime(expiryTime);

  const utcTime = date.toUTCString();
  document.cookie = 'loggedIn=true; expires=' + utcTime + ';';
};
