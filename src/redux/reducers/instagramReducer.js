let initialState = {
  loading: true,
  userProfileData: {},
  userFeedsData: {},
};

const instagramReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_INSTA_DATA_REQUEST":
      return { ...state, loading: true };

    case "GET_INSTA_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        userProfileData: payload.userProfileJson.data,
        userFeedsData: payload.userFeedsJson.data,
      };

    default:
      return { ...state };
  }
};

export default instagramReducer;
