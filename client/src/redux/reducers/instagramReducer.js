let initialState = {
  loading: true,
  media_count: undefined,
  feedData: undefined,
};

const instagramReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_INSTA_DATA_REQUEST":
      return { ...state };

    case "GET_INSTA_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        media_count: payload.profileJson.media_count,
        feedData: payload.feedJson.data,
      };

    default:
      return state;
  }
};

export default instagramReducer;
