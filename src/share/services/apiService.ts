import axios from 'axios';
import apiConfig from '../config/apiConfig';

axios.defaults.baseURL = apiConfig.apiUrl;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = apiConfig.contentType;
axios.defaults.headers.put['Content-Type'] = apiConfig.contentType;

export default axios;
