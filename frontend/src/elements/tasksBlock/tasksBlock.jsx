import React from 'react';
import { Button, Card, Flex, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons';

const tasks = [
  {
    id: 1,
    title: 'Завдання 2',
    deadline: '06.03.2025',
    description: 'Опис завдання 2',
    status: 'В процесі',
    owner: 'Деканат',
    student: 'Іванов Іван Іванович',
  },
  {
    id: 2,
    title: 'Завдання 1',
    deadline: '05.02.2025',
    description: 'Опис завдання 1',
    status: 'Виконано студентом',
    owner: 'Деканат',
    student: 'Іванов Іван Іванович',
  },
  {
    id: 3,
    title: 'Завдання 3',
    deadline: '08.04.2025',
    description: 'Опис завдання 3',
    status: 'Прийнято викладачем',
    owner: 'Деканат',
    student: 'Іванов Іван Іванович',
  },
];

export function TasksBlock({ children }) {
  return (
    <>
      {children}
      <Flex vertical justify='center' style={{ margin: '20px 0', justifySelf: 'center', gap: 20 }}>
        {tasks.length > 0
          ? tasks.map(({ id, deadline, title, status, owner, description, student }) => {
            {/* const filteredList = tasks?.filter(value => value.day === title) || []; */ }
            {/* filteredList.length > 0 && */ }

            return (
              <>
                <Card
                  key={id}
                  title={
                    <Flex wrap style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Виконує: {student}</span>
                      <Flex>
                        {status} <br /> Створив: {owner}
                        <Button type='default' style={{ marginLeft: 10 }}>
                          <EditOutlined />
                        </Button>
                      </Flex>
                    </Flex>}
                  size="small"
                  style={{
                    width: '48vw',
                  }}
                >
                  <Space direction="vertical">
                    <div>Виконати до: {deadline}</div>
                    <h4>Заголовок: {title}</h4>
                    <div>Текст: {description}</div>
                  </Space>
                </Card>
              </>
            );
          })
          : <p key={'freeTaskBoard'}>{'Задачі відсутні'}</p>}
      </Flex>
    </>
  )
}