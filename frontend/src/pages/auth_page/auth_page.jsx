import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, Input } from 'antd';

import style from './ltr.module.css';

import { Auth } from '../../api/auth';
import { useUser } from '../../providers/UserProvider';
import { RegisterModal } from '../../elements/registerModal/registerModal';

export const AuthPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await Auth.login(values)

      login(data);

      navigate(`/cabinet/${data?.user.role}`)
    } catch (error) {
      console.log(error)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={style.form_wrapper}>
      <Form
        name="basic"
        autoComplete="off"
        style={{
          width: 500,
          padding: 40,
          border: '1px solid lightgrey',
          borderRadius: 10,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <p>
          Not a member?
          <RegisterModal />
        </p>
      </Form>
    </div>
  )
}