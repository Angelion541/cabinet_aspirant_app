import React from 'react';
import { Button, Layout } from 'antd';

import { MenuBlock } from '../../elements/menu_block/menu_block';
import { useUser } from '../../providers/UserProvider';

const { Header } = Layout;

export function HeaderBlock({ menuItems, setCurrentMenu }) {
  const { logout } = useUser();

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: 'calc(100% - 100px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <MenuBlock items={menuItems} setCurrentMenu={setCurrentMenu} />
      <Button type="text" style={{ color: 'white', fontWeight: 'bold' }} onClick={logout}>Вихід</Button>
    </Header>
  )
}