import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuBlock } from '../elements/menu_block/menu_block';

describe('MenuBlock', () => {
  const mockItems = [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
  ];

  beforeEach(async () => {
    await act(async () => {
      render(<MenuBlock items={mockItems} />);
    });
  });

  it('should render Menu component with the correct items', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should set the first item as selected by default', () => {
    const firstItem = screen.getByText('Item 1').closest('.ant-menu-item');
    expect(firstItem).toHaveClass('ant-menu-item-selected');
  });

  it('should update the selected item when a menu item is clicked', () => {
    const secondItem = screen.getByText('Item 2').closest('.ant-menu-item');
    fireEvent.click(secondItem);

    expect(secondItem).toHaveClass('ant-menu-item-selected');
    const firstItem = screen.getByText('Item 1').closest('.ant-menu-item');
    expect(firstItem).not.toHaveClass('ant-menu-item-selected');
  });
});