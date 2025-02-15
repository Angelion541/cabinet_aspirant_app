import axios from 'axios';

const backendUrl = process.env.REACT_APP_SERVER_IP_DEV;

export const axiosInstance = axios.create({ baseURL: backendUrl });
