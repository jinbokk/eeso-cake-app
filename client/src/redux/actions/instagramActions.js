import axios from "axios";

const api_instagram = axios.create({
  baseURL: process.env.REACT_APP_INSTAGRAM_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


function getInstaData() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_INSTA_DATA_REQUEST" });

      const getUserProfile = api_instagram.get(
        `/me?fields=media_count&access_token=${process.env.REACT_APP_INSTAGRAM_API_ACCESS_TOKEN}`
      );

      const getUserFeeds = api_instagram.get(
        `/me/media?fields=caption,media_url,permalink,timestamp,children{media_url}&limit=12&access_token=${process.env.REACT_APP_INSTAGRAM_API_ACCESS_TOKEN}`
      );

      const [userProfileJson, userFeedsJson] = await Promise.all([
        getUserProfile,
        getUserFeeds,
      ]);

      dispatch({
        type: "GET_INSTA_DATA_SUCCESS",
        payload: {
          userProfileJson: userProfileJson,
          userFeedsJson: userFeedsJson,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_INSTA_DATA_FAILURE", payload: { error } });
    }
  };
}

export const instagramActions = {
  getInstaData,
};
