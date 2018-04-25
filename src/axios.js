import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shotonzeiss.firebaseio.com/'
});

export default instance;
