import React, { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';

import style from './ltr.module.css';

export const MenuBlock = ({ items, setCurrentMenu }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(items[0].key);

  const onClick = (e) => {
    setCurrent(e.key);
    setCurrentMenu(e.key);
  };

  return (
    <Menu
      className={style.header_wrapper}
      mode="horizontal"
      style={{
        flex: 1,
      }}
      selectedKeys={[current]}
      items={items}
      onClick={onClick}
    />
  );
}
