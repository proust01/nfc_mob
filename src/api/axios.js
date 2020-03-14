  
import axios from 'axios';
import { AsyncStorage } from 'react-native';

// let url;
let url = 'http://3c96a771.ngrok.io';
// if (__DEV__) {
//   url = 'http://3d3cbf74.ngrok.io';
// } else {
//   url = 'https://sleepy-savannah-10606.herokuapp.com';
// }

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;

