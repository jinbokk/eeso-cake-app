let initialState = {
  instaLoading: true,
  userProfileData: undefined,
  userFeedsData: undefined,
};

const instagramReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_INSTA_DATA_REQUEST":
      return { ...state };

    case "GET_INSTA_DATA_SUCCESS":
      return {
        ...state,
        instaLoading: false,
        userProfileData: payload.userProfileJson.data,
        userFeedsData: payload.userFeedsJson.data,
      };

    default:
      return { ...state };
  }
};

export default instagramReducer;
