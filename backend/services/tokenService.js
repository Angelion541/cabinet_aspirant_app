import jwt from "jsonwebtoken";

export function generateToken(user) {
  const SECRET_KEY = process.env.SECRET_KEY;

  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
}