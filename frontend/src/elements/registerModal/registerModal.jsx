import React, { useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';
// import { Lessons } from '../../api/lessons';
const { Item } = Form;

export function RegisterModal() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
    form.resetFields();
  };


  const onFinish = (values) => {
    console.log('Success:', values);

    // Симуляція асинхронного запиту
    setConfirmLoading(false);
    setOpen(false);
    form.resetFields(); // Очистити форму після успішної реєстрації
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="text" style={{ marginLeft: 20, marginBottom: 5 }} onClick={showModal}>
        {'Sign up'}
      </Button>
      <Modal
        title="Реєстрація аспіранта"
        open={open}
        onOk={handleOk}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Item name="username"
            label="Логін"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input autoComplete={'off'} />
          </Item>

          <Item name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Item>

          <Item name="name"
            label="Ім'я"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>

          <Item name="surname"
            label="Прізвище"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>

          <Item name="middle_name"
            label="Побатькові"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>

          <Item name="group"
            label="Група"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>

          <Item name="year"
            label="Рік навчання"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  );
};