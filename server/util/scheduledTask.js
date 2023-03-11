const { User } = require("../models/User.js");
const moment = require("moment");
require("moment/locale/ko");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.locale("ko");
dayjs.extend(customParseFormat);

exports.update_order_status = async () => {
  // 1. 결제완료 : order_paid
  // 2. 제작중 : order_making
  // 3. 픽업 대기: order_waiting_for_pickup
  // 4. 픽업 완료: order_complete
  // 5. 취소 대기 : order_waiting_for_cancel
  // 6. 주문 취소 : order_cancelled

  // 주문일자로부터 1일 뒤 "제작중" 상태로 변환
  await User.updateMany(
    {},
    {
      "history.$[elem].status": "order_making",
      // "history.$[].products.$[elem].status": "order_making",
    },
    {
      arrayFilters: [
        {
          "elem.status": "order_paid",
          "elem.paymentDate": {
            $lte: dayjs().subtract(1, "days").format(),
          }, // 1일 전
        },
      ],
    }
  );

  // 픽업날짜 도래시 "픽업 대기중" 상태로 변환
  await User.updateMany(
    {},
    {
      "history.$[elem].status": "order_waiting_for_pickup",
    },
    {
      arrayFilters: [
        {
          "elem.status": "order_making",
          "elem.deliveryDateTime.dateType": {
            $gt: dayjs().set("hour", 0).set("minute", 0).set("second", 0).format(),
            $lt: dayjs().set("hour", 23).set("minute", 59).set("second",59).format(),
          },
        },
      ],
    }
  );

  // 픽업날짜 이후 "픽업 완료" 상태로 변환
  await User.updateMany(
    {},
    {
      "history.$[elem].status": "order_complete",
    },
    {
      arrayFilters: [
        {
          "elem.status": "order_waiting_for_pickup",
          "elem.deliveryDateTime.dateType": {
            $gt: dayjs().subtract(1, "minute").format(),
            $lt: dayjs().format(),
          },
        },
      ],
    }
  );
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
