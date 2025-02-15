import React from 'react';
import { RouterProvider } from 'react-router';
import { App as AntdApp } from 'antd';

import { router } from './routers/initRouters.js';
import { UserProvider } from './providers/UserProvider.js';

import './App.css';

function App() {
  return (
    <AntdApp>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AntdApp>
  );
}

export default App;
