import React from 'react';
import { Table } from 'antd';

export function CardTable({ lessonsList }) {
  const columns = [
    {
      title: <span data-testid="column-time">Час</span>,
      dataIndex: 'time',
      key: 'time',
      width: 110,
      headerCell: { 'data-testid': 'column-time' },
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span data-testid="column-lesson">Предмет</span>,
      dataIndex: 'lesson',
      key: 'lesson',
      headerCell: { 'data-testid': 'column-lesson' },
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <Table
      size='small'
      columns={columns}
      dataSource={lessonsList.length > 0 ? lessonsList.map(item => ({ ...item, key: item.id })) : []}
      pagination={false}
      locale={{ emptyText: 'Уроки відсутні' }}
      title={() => ' '}
      data-testid="card-table"
    />
  );
}