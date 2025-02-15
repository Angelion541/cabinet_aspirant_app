import { axiosInstance } from './axios';

export class Lessons {
  /** @description /lessons/get_groups */
  static async getGroups(values) {
    try {
      const response = await axiosInstance
        .get('/lessons/get_groups', {
          headers: {
            'Authorization': `Bearer ${sessionStorage['token']}`
          }
        }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  /** @description /lessons/add_group */
  static async addGroup(values) {
    try {
      const response = await axiosInstance
        .post('/lessons/add_group',
          { groupName: values },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage['token']}`
            },
          }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  /** @description /lessons/get_lessons */
  static async getLessons(groupName) {
    try {
      const response = await axiosInstance
        .get('/lessons/get_lessons', {
          params: {
            group: groupName
          },
          headers: {
            'Authorization': `Bearer ${sessionStorage['token']}`
          }
        }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  /** @description /lessons/add_lesson */
  static async addLesson(values) {
    try {
      const response = await axiosInstance
        .post('/lessons/add_lesson',
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage['token']}`
            },
          }
        );

      return response;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
