import axios from 'axios';

const backendUrl = import.meta.env.VITE_APP_SERVER_IP_DEV;

export const axiosInstance = axios.create({ baseURL: backendUrl });
