import bcrypt from "bcrypt";

import { db } from '../config/index.js';
import { generateToken } from "../services/tokenService.js";

const { pool } = db;

export async function authorization(req, res) {
  const { username, password } = req.body;
  let client;

  try {
    client = await pool.connect();

    const query = `
      SELECT 
        u.id as id,
        login as username,
        password,
        r.name as role
      FROM 
          users u
      LEFT JOIN
          roles r ON u.role = r.id
      WHERE
          u.login = $1;
    `;

    const { rows: users } = await client.query(query, [username]);

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid login or password" });
    }

    // const HASH_SALT_ROUNDS = Number(process.env.HASH_SALT_ROUNDS)
    // const hashedPassword = await bcrypt.hash(user.password, HASH_SALT_ROUNDS);
    // console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login or password" });
    }

    const token = generateToken(user);

    console.log(token)

    const { password: userPassword, ...preparedUser } = user;

    if (user.role === 'student') {
      const { rows: userData } = await client.query(`
        SELECT
          g.id AS group_id,
          g.name AS group_name,
          s.name,
          s.surname,
          s.middle_name,
          s.year AS study_year
        FROM
          students s
        LEFT JOIN
          groups g ON g.id = s.group
        LEFT JOIN
          users u ON u.id = s.user
        WHERE
          s.user = $1;
        `, [user.id]);

      console.log('userData', userData)
      Object.assign(preparedUser, userData[0]);
    }

    res.json({ token, user: preparedUser });
  } catch (error) {
    console.log(error);
  } finally {
    if (client) client.release();
  }
}

export async function registration(req, res) {
  const {
    username,
    password,
    ...student_data
  } = req.body;
  let client;

  try {
    client = await pool.connect();

    const query = `
      SELECT 
        id,
        login as username,
        password,
        role
      FROM 
        users
      WHERE
        users.login = $1;
    `;

    const { rows: users } = await client.query(query, [username]);
    if (users.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const HASH_SALT_ROUNDS = Number(process.env.HASH_SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
  } finally {
    if (client) client.release();
  }
}
