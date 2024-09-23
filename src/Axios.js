import axios from 'axios';
const instance = axios.create({
  BASE_URL: 'https://careclub-x4qw.onrender.com', //backend URL
});

export default instance;
