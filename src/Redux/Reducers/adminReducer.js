const initialState = {
  isAuthenticated: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case 'ADMIN_LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
