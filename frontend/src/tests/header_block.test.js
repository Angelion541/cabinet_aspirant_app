import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderBlock } from '../elements/header/header_block';
import { useUser } from '../providers/UserProvider';
import { MenuBlock } from '../elements/menu_block/menu_block';

jest.mock('../providers/UserProvider');
jest.mock('../elements/menu_block/menu_block', () => ({
  MenuBlock: jest.fn(() => <div>MenuBlock Component</div>),
}));

describe('HeaderBlock', () => {
  const mockMenuItems = ['Item1', 'Item2'];
  const mockLogout = jest.fn();

  beforeEach(() => {
    useUser.mockReturnValue({ logout: mockLogout });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render MenuBlock with the correct menuItems', async () => {
    await act(async () => {
      render(<HeaderBlock menuItems={mockMenuItems} />);
    });

    expect(screen.getByText('MenuBlock Component')).toBeInTheDocument();
    expect(MenuBlock).toHaveBeenCalledWith({ items: mockMenuItems }, {});
  });

  it('should call logout when the logout button is clicked', async () => {
    await act(async () => {
      render(<HeaderBlock menuItems={mockMenuItems} />);
    });

    const logoutButton = screen.getByText('Вихід');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('should render the header with correct styles', async () => {
    await act(async () => {
      render(<HeaderBlock menuItems={mockMenuItems} />);
    });

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: 'calc(100% - 100px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    });
  });

  it('should render the header with the correct structure', async () => {
    await act(async () => {
      render(<HeaderBlock menuItems={mockMenuItems} />);
    });

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toContainElement(screen.getByText('MenuBlock Component'));
    expect(header).toContainElement(screen.getByText('Вихід'));
  });
});