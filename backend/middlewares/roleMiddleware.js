export function checkRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Користувач не авторизований' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Доступ заборонено: недостатньо прав' });
    }

    next();
  };
};

export function checkRoles(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Користувач не авторизований' });
    }

    if (!roles.some(role => req.user.role.includes(role))) {
      return res.status(403).json({ message: 'Доступ заборонено: недостатньо прав' });
    }

    next();
  };
};