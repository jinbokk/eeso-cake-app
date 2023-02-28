const FormData = require("form-data");
const axios = require("axios");

const iamportGenerateAccessToken = async () => {
  const form = new FormData();
  form.append("imp_key", process.env.IMP_API_KEY);
  form.append("imp_secret", process.env.IMP_API_SECRET);

  const getToken = await axios.post(
    `https://api.iamport.kr/users/getToken`,
    form
  );

  const access_token = getToken.data.response.access_token;

  return access_token;
};

module.exports = { iamportGenerateAccessToken };
