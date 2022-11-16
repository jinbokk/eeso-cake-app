import api_instagram from "../api_instagram";

function getInstaData() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_INSTA_DATA_REQUEST" });

      const getUserProfile = api_instagram.get(
        `/me?fields=media_count&access_token=${process.env.REACT_APP_AXIOS_INSTAGRAM_API_ACCESS_TOKEN}`
      );

      const getUserFeeds = api_instagram.get(
        `/me/media?fields=caption,media_url,permalink,timestamp&limit=12&access_token=${process.env.REACT_APP_AXIOS_INSTAGRAM_API_ACCESS_TOKEN}`
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
