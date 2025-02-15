import { db } from '../config/index.js';
const { pool } = db;

export async function getGroups(req, res) {
  let client;

  try {
    client = await pool.connect();

    const query = `
      SELECT 
        (SELECT json_agg(json_build_object('id', g.id, 'name', g.name)) FROM groups g) AS groups,
        (SELECT json_agg(json_build_object('id', d.id, 'name', d.name)) FROM days d) AS days,
        (SELECT json_agg(json_build_object('id', lt.id, 'time', lt.time)) FROM lesson_time lt) AS lesson_time,
        (SELECT json_agg(json_build_object('id', l.id, 'name', l.name)) FROM lessons l) AS lessons
    ;`;
    const { rows: data } = await client.query(query);
    console.log('data', data[0])

    res.json(data[0])
  } catch (error) {
    console.log(error);
  } finally {
    if (client) client.release();
  }
}

export async function addGroup(req, res) {
  const { groupName } = req.body;
  let client;

  try {
    client = await pool.connect();

    await client.query('BEGIN');
    const { rows: result } = await client.query('INSERT INTO groups (name) VALUES ($1) RETURNING *', [groupName]);

    console.log('addGroup: ', result)

    await client.query('COMMIT');

    res.json(result)
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('addGroupError: ', error);
  } finally {
    if (client) client.release();
  }
}

export async function getLessons(req, res) {
  const { group } = req.query;
  let client;

  console.log(group)

  if (!group) {
    return res.status(400).send("Група обов'язкова");
  }

  try {
    client = await pool.connect();

    const query = `
          SELECT
            ll.id,
            ll.week,
            l.name as lesson,
            lt.time,
            d.name as day
          FROM
            lessons_list ll
          LEFT JOIN
            lessons l ON l.id = ll.lesson
          LEFT JOIN
            lesson_time lt ON lt.id = ll.lesson_time
          LEFT JOIN
            days d ON d.id = ll.day
          LEFT JOIN
            groups g ON g.id = ll.group
          WHERE g.id = $1
    `;

    const { rows: lessons } = await client.query(query, [group]);

    console.log(lessons);

    res.json(lessons)
  } catch (error) {
    console.log(error);
  } finally {
    if (client) client.release();
  }
}

export async function addLesson(req, res) {
  const { group, lesson, lesson_time, day, week } = req.body;
  let client;

  try {
    client = await pool.connect();

    await client.query('BEGIN');

    const { rows: result } = await client.query(`
      INSERT INTO lessons_list ("group", lesson, lesson_time, day, week)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [group, lesson, lesson_time, day, Number(week)]);

    console.log('addGroup: ', result)

    await client.query('COMMIT');

    req.query.group = group;
    getLessons(req, res)
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('addGroupError: ', error);
  } finally {
    if (client) client.release();
  }
}

export function removeLesson(req, res) {

}