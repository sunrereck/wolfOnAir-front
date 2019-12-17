import axios from 'axios';

let apiPath = 'http://localhost:8080/api';

if (process.env.NODE_ENV === 'production') {
  apiPath = 'ddd';
}

axios.defaults.baseURL = apiPath;

export default axios;
