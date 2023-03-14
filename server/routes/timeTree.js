const express = require("express");
const router = express.Router();
const {
  CalendarAppAuthenticator,
  CalendarAppClient,
} = require("@timetreeapp/web-api");

router.post("/", async (req, res) => {
// Generate and download the private key. Please refer to the link below.
// https://developers.timetreeapp.com/docs/api/calendar-app
const authenticator = new CalendarAppAuthenticator({
  applicationId: "jZ6YvPCYcorc",
  privateKey: "-----BEGIN RSA PRIVATE KEY-----\n....-----END RSA PRIVATE KEY-----\n",
});

  const data = await client.getCalendar();

  res.status(200).json({ success: true });
});

module.exports = router;
