import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from './../Actions/eventActions'; 

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
    case FETCH_EVENTS_REQUEST:
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter(event => event._id !== action.payload),
      };
    case ADD_EVENT_FAILURE:
    case FETCH_EVENTS_FAILURE:
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default eventReducer;

