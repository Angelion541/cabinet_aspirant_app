import { Button, Result } from 'antd';
import React from 'react'

export const ForbiddenPage = () => {
  const redirectToHome = () => {
    window.location.href = '/';
  };

  return (
    <Result
      status="500"
      subTitle={'Технічні роботи на сайті, почекайте!'}
      extra={
        <Button type="primary" onClick={redirectToHome}>
          {'Назад на до авторизації'}
        </Button>
      }
    />
  );
}