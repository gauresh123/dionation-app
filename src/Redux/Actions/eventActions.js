import axios from 'axios';
import { baseURL } from '../../../config';

export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/doue07abb/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'CareClub'; 

export const addEvent = (eventData) => async (dispatch) => {  
  dispatch({ type: ADD_EVENT_REQUEST });
  try {
    const formData = new FormData();
    formData.append('file', eventData.image); 
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Upload image to Cloudinary
    const cloudinaryResponse = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const imageUrl = cloudinaryResponse.data.secure_url;
    const response = await axios.post(`${baseURL}/api/event/events`, {
      ...eventData,
      imageUrl, 
    });
    dispatch({ type: ADD_EVENT_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: ADD_EVENT_FAILURE, error: error.message });
  }
};

// fetch events
export const fetchEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    const response = await axios.get(`${baseURL}/api/event/events`);
    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EVENTS_FAILURE, error: error.message });
  }
};

// delete evetns
export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    await axios.delete(`${baseURL}/api/event/events/${eventId}`);
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAILURE, error: error.message });
  }
};
