import axios from 'axios';

import { backendUrl } from '../config/mainConstants';

const instance = axios.create({
  baseURL: backendUrl,
});

export default instance;
