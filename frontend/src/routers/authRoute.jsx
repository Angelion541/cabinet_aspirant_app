import React from 'react';
import { Navigate } from 'react-router';

import { routePathKeys } from '../data/routePathKeys';
import { useUser } from '../providers/UserProvider';



export const AuthRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated) {
    return <Navigate to={routePathKeys.home} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={routePathKeys.forbidden} replace />;
  }

  return element;
};
