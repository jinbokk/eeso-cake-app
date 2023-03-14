import axios from "axios";

function getInstaData() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_INSTA_DATA_REQUEST" });

      const getProfileData = axios
        .get(`/api/instagram/profile`)
        .then((res) => res.data.data);

      const getFeedData = axios
        .get(`/api/instagram/feed`)
        .then((res) => res.data.data);

      const [profileDataJson, feedJson] = await Promise.all([
        getProfileData,
        getFeedData,
      ]);

      dispatch({
        type: "GET_INSTA_DATA_SUCCESS",
        payload: {
          profileJson: profileDataJson,
          feedJson: feedJson,
        },
      });
    } catch (error) {
      console.log("instagram api Error :", error);
    }
  };
}

export const instagramActions = {
  getInstaData,
};
