import { axiosInstance } from './axios';

export class Auth {
  /** @description /auth/login */
  static async login(values) {
    try {
      const response = await axiosInstance
        .post('/auth/login',
          values,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  /** @description /auth/register */
  static async register(values) {
    try {
      const response = await axiosInstance
        .post('/auth/register',
          values,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
