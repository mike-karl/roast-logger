const hostname = require("os").hostname;
const port = process.env.PORT;

const previewUrl = `https://${hostname}-${port}.csb.app`;

console.log(previewUrl);

const allowedOrigins = [
  "https://www.yoursite.com",
  previewUrl,
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:3000",
  "http://localhost:5000",
];

module.exports = allowedOrigins;
