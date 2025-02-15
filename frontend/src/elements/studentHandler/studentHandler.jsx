import React from 'react'
import { Flex, Select, Typography } from 'antd';
const { Title } = Typography;

const items = [
  { value: '1', label: 'Іванов Іван Іванович' },
  { value: '2', label: 'Петров Петро Петрович' },
  { value: '3', label: 'Сидоров Сидір Сидорович' }
];

const selectStyles = {
  width: 300,
  marginBottom: 5
};

export function StudentHandler({ windowWidth }) {
  return (
    <Flex wrap={windowWidth < 450} style={{ alignItems: 'end', gap: 10 }}>
      <Title level={4}>{'Студент:'}</Title>
      <Select
        style={selectStyles}
        placeholder="Select student"
        options={items}
        onChange={(value) => console.log(value)}
      />
    </Flex>
  )
}