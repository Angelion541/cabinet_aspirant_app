import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export function SelectWithAdd({ options = [], style: parrentStyle, addOptions, getLessonsList, setSelectedGroup }) {
  const [items, setItems] = useState([]);
  const [enteredName, setEnteredName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setItems(options?.map(item => ({ value: item.value, label: item.label })));
  }, [options])

  const onGroupChange = async (event) => {
    const selectedGroup = items.find(item => item.value === event);
    if (event) {
      setSelectedGroup(selectedGroup);
      getLessonsList(event);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    const addedOption = await addOptions(enteredName);

    await setItems((items) => [...items, addedOption[0]]);
    setEnteredName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{
        width: 300,
        ...parrentStyle,
      }}
      placeholder="Select group"
      onChange={onGroupChange}
      options={items}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Введіть ім'я"
              ref={inputRef}
              value={enteredName}
              onChange={(e => setEnteredName(e.target.value))}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
              type="text"
              data-testid='button'
              icon={<PlusOutlined />}
              onClick={addItem}
            >
              {'Додати групу'}
            </Button>
          </Space>
        </>
      )}
    />
  );
};