import axios from "axios";

const REGEX = /(?<id>\w{5,6})-(?<port>\d{1,5})\.(?<hostname>.*)/;

function getPreviewUrl(port) {
  const currentUrl = window.location.host;

  console.log(window.location.host);

  const currentMatch = currentUrl.match(REGEX);

  if (!currentMatch?.groups) {
    return undefined;
  }
  const { id, hostname } = currentMatch.groups;

  console.log(id);
  console.log(hostname);
  console.log(port);

  if (!id || !port || !hostname) {
    return undefined;
  }

  return `${id}-${port}.${hostname}`;
}

const port = process.env.REACT_APP_SERVER_PORT ?? "3000";
export const BASE_URL =
  process.env.REACT_APP_CODESANDBOX === "true"
    ? `https://${getPreviewUrl(port)}`
    : `http://localhost:${port}/`;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
