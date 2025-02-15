import React from 'react';
import { roleKeys } from '../data/roleKeys';
import { routePathKeys } from '../data/routePathKeys';

import { AuthRoute } from './authRoute';
import { AuthPage } from '../pages/auth_page/auth_page';
import { DeaneryCabinet } from '../pages/cabinets/deanery_cabinet/deanery_cabinet';
import { StudentCabinet } from '../pages/cabinets/student_cabinet/student_cabinet';
import { ForbiddenPage } from '../pages/error_pages/forbidden_page/forbidden_page';

export const routes = [
  { path: routePathKeys.home, element: <AuthPage /> },
  {
    path: routePathKeys.cabinet,
    children: [
      {
        path: routePathKeys.deanery,
        element: <AuthRoute element={<DeaneryCabinet />} allowedRoles={[roleKeys.dean]} />
      },
      {
        path: routePathKeys.student,
        element: <AuthRoute element={<StudentCabinet />} allowedRoles={[roleKeys.student]} />
      },
    ],
  },
  { path: routePathKeys.forbidden, element: <ForbiddenPage /> }
];