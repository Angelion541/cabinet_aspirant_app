import { Lessons } from '../api/lessons';
import { axiosInstance } from '../api/axios';

jest.mock('../api/axios'); // Mocking axiosInstance

describe('Lessons Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('should return response when getGroups is successful', async () => {
      const mockResponse = { data: { groups: [] } };
      axiosInstance.get.mockResolvedValue(mockResponse);

      const result = await Lessons.getGroups();

      expect(axiosInstance.get).toHaveBeenCalledWith('/lessons/get_groups', {
        headers: {
          'Authorization': `Bearer ${sessionStorage['token']}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when getGroups fails', async () => {
      const mockError = new Error('Get groups failed');
      axiosInstance.get.mockRejectedValue(mockError);

      await expect(Lessons.getGroups()).rejects.toThrow('Get groups failed');
      expect(axiosInstance.get).toHaveBeenCalled();
    });
  });

  describe('addGroup', () => {
    it('should return response when addGroup is successful', async () => {
      const mockResponse = { data: { message: 'Group added' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await Lessons.addGroup('New Group');

      expect(axiosInstance.post).toHaveBeenCalledWith('/lessons/add_group', { groupName: 'New Group' }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage['token']}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when addGroup fails', async () => {
      const mockError = new Error('Add group failed');
      axiosInstance.post.mockRejectedValue(mockError);

      await expect(Lessons.addGroup('New Group')).rejects.toThrow('Add group failed');
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });

  describe('getLessons', () => {
    it('should return response when getLessons is successful', async () => {
      const mockResponse = { data: { lessons: [] } };
      axiosInstance.get.mockResolvedValue(mockResponse);

      const result = await Lessons.getLessons('Group 1');

      expect(axiosInstance.get).toHaveBeenCalledWith('/lessons/get_lessons', {
        params: {
          group: 'Group 1'
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage['token']}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when getLessons fails', async () => {
      const mockError = new Error('Get lessons failed');
      axiosInstance.get.mockRejectedValue(mockError);

      await expect(Lessons.getLessons('Group 1')).rejects.toThrow('Get lessons failed');
      expect(axiosInstance.get).toHaveBeenCalled();
    });
  });

  describe('addLesson', () => {
    it('should return response when addLesson is successful', async () => {
      const mockResponse = { data: { message: 'Lesson added' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const lessonData = { title: 'New Lesson', content: 'Lesson content' };
      const result = await Lessons.addLesson(lessonData);

      expect(axiosInstance.post).toHaveBeenCalledWith('/lessons/add_lesson', lessonData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage['token']}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when addLesson fails', async () => {
      const mockError = new Error('Add lesson failed');
      axiosInstance.post.mockRejectedValue(mockError);

      const lessonData = { title: 'New Lesson', content: 'Lesson content' };
      await expect(Lessons.addLesson(lessonData)).rejects.toThrow('Add lesson failed');
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });
});