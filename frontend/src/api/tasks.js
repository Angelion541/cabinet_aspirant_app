import { axiosInstance } from './axios';
import { Lessons } from './lessons';

export class Tasks {
  /** @description /lessons/get_groups */
  static async getGroups(values) {
    return await Lessons.getGroups(values);
  }
}