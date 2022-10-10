import api_instagram from "../api_instagram";

function getInstaData() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_INSTA_DATA_REQUEST" });

      // const getUserProfile = api_instagram.get(
      //   `/me?fields=username,media_count&access_token=${process.env.REACT_APP_AXIOS_INSTAGRAM_API_ACCESS_TOKEN}`
      // );

      const getUserFeeds = await api_instagram.get(
        `/me/media?fields=id,caption,media_url,username,permalink,timestamp&limit=12&access_token=${process.env.REACT_APP_AXIOS_INSTAGRAM_API_ACCESS_TOKEN}`
      );

      // const [userProfileJson, userFeedsJson] = await Promise.all([
      //   getUserProfile,
      //   getUserFeeds,
      // ]);

      dispatch({
        type: "GET_INSTA_DATA_SUCCESS",
        payload: {
          // userProfileJson: userProfileJson,
          // userFeedsJson: userFeedsJson,
          userFeedsJson: getUserFeeds
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
