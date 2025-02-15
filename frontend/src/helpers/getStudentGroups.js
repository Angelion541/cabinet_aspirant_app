import { Lessons } from '../api/lessons';

export async function getStudentGroups(setDicts, setGroups) {
  try {
    const result = await Lessons.getGroups();

    const { groups, ...dicts } = result.data;

    setDicts(dicts);
    setGroups(groups);
  } catch (error) {
    console.log(error);
  }
}