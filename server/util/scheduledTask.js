const { User } = require("../models/User.js");
const moment = require("moment");

exports.update_order_status = () => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  User.updateMany(
    {},
    {
      "history.$[elem].status": "order_making",
    },
    {
      arrayFilters: [
        {
          "elem.status": "order_paid",
          "elem.createdAt": new Date(
            new Date().getTime() + KR_TIME_DIFF - oneDay
          ), // 1일 전
        },
      ],
    }
  ).exec((err, docs) => {
    return docs;
  });
};

///////////////////////////////////////////////////

const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");

const INSTAGRAM_API_ACCESS_TOKEN = process.env.INSTAGRAM_API_ACCESS_TOKEN;

const envFilePath = path.resolve(__dirname, "../.env");

// read .env file & convert to array
const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);

/**
 * Updates value for existing key or creates a new key=value line
 *
 * This function is a modified version of https://stackoverflow.com/a/65001580/3153583
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 */
const setEnvValue = (key, value) => {
  const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split("=")[0] === key);
  if (targetLine !== undefined) {
    // update existing line
    const targetLineIndex = envVars.indexOf(targetLine);
    // replace the key/value with the new value
    envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
  } else {
    // create new key value
    envVars.push(`${key}="${value}"`);
  }
  // write everything back to the file system
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

exports.renew_instagramAPI_token = () => {
  axios
    .get(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_API_ACCESS_TOKEN}`
    )
    .then((res) =>
      setEnvValue(
        "INSTAGRAM_API_ACCESS_TOKEN",
        res.data.access_token.replace(/['"]+/g, "")
      )
    );
};
