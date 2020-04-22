import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_DB_URL // TODO: add your firebase db url as an environment variable
});

export default instance;