import { Auth } from '../api/auth.js';
import { axiosInstance } from '../api/axios.js';

jest.mock('../api/axios.js'); // Мокування axiosInstance

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return response when login is successful', async () => {
      const mockResponse = { data: { token: 'fake_token' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await Auth.login({ email: 'test@example.com', password: 'password123' });

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login',
        { email: 'test@example.com', password: 'password123' },
        { headers: { 'Content-Type': 'application/json' } });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when login fails', async () => {
      const mockError = new Error('Login failed');
      axiosInstance.post.mockRejectedValue(mockError);

      await expect(Auth.login({ email: 'test@example.com', password: 'wrongpassword' })).rejects.toThrow('Login failed');
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should return response when registration is successful', async () => {
      const mockResponse = { data: { message: 'User registered' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password123');

      const result = await Auth.register(formData);

      expect(axiosInstance.post).toHaveBeenCalledWith('/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when registration fails', async () => {
      const mockError = new Error('Registration failed');
      axiosInstance.post.mockRejectedValue(mockError);

      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password123');

      await expect(Auth.register(formData)).rejects.toThrow('Registration failed');
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });
});