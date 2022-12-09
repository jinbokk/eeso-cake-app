const express = require("express");
const router = express.Router();
const axios = require("axios");
const INSTAGRAM_API_BASE_URL = process.env.INSTAGRAM_API_BASE_URL;
const INSTAGRAM_API_ACCESS_TOKEN = process.env.INSTAGRAM_API_ACCESS_TOKEN;

router.get("/profile", async (req, res) => {
  const result = await axios.get(
    `${INSTAGRAM_API_BASE_URL}?fields=media_count&access_token=${process.env.INSTAGRAM_API_ACCESS_TOKEN}`,
    { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
  );
  res.status(200).json({ success: true, data: result.data });
});

router.get("/feed", async (req, res) => {
  const result = await axios.get(
    `${INSTAGRAM_API_BASE_URL}/media?fields=caption,media_url,permalink,timestamp,children{media_url}&limit=12&access_token=${process.env.INSTAGRAM_API_ACCESS_TOKEN}`,
    { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
  );
  res.status(200).json({ success: true, data: result.data });
});

module.exports = router;
