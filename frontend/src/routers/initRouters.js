import { createBrowserRouter } from 'react-router';
import { routes } from './routesList';

const config = {
  future: {
    v7_relativeSplatPath: true,
  },
};

export const router = createBrowserRouter(routes, config);
