import jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Заголовок авторизації відсутній' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Помилковий формат заголовка авторизації' });
    }

    if (!token) {
      return res.status(401).json({ message: 'Токен не надано' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Невірний токен' });
  }
}