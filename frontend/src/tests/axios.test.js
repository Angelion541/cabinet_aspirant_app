import axios from 'axios';
import { axiosInstance } from '../api/axios';

jest.mock('../api/axios');

describe('axiosInstance', () => {
  beforeAll(() => {
    process.env.REACT_APP_SERVER_IP_DEV = 'http://localhost:3000';
  });

  it('should be created with the correct baseURL', () => {
    const backendUrl = process.env.REACT_APP_SERVER_IP_DEV;
    expect(axios.create).toHaveBeenCalledWith({ baseURL: backendUrl });
  });
});