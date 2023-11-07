import axios, { AxiosInstance } from 'axios';
import { backendUrl } from 'config/mainConstants';

const instance: AxiosInstance = axios.create({
  baseURL: backendUrl,
});

export default instance;
