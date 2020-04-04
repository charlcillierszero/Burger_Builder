import axios from 'axios';

const instance = axios.create({
  baseURL: 'baseURL' // TODO: add your firebase db url here
});

export default instance;