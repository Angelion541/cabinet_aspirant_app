import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigate } from 'react-router';
import { AuthRoute } from '../routers/authRoute';
import { useUser } from '../providers/UserProvider';
import { routePathKeys } from '../data/routePathKeys';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: jest.fn(() => null),
}));

jest.mock('../providers/UserProvider');

describe('AuthRoute', () => {
  const mockElement = <div>Protected Content</div>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to home if user is not authenticated', async () => {
    useUser.mockReturnValue({ isAuthenticated: false, user: null });

    render(<AuthRoute element={mockElement} allowedRoles={['admin']} />);

    expect(Navigate).toHaveBeenCalledWith({ to: routePathKeys.home, replace: true }, {});
  });

  it('should navigate to forbidden if user does not have the required role', async () => {
    useUser.mockReturnValue({ isAuthenticated: true, user: { role: 'user' } });

    render(<AuthRoute element={mockElement} allowedRoles={['admin']} />);

    expect(Navigate).toHaveBeenCalledWith({ to: routePathKeys.forbidden, replace: true }, {});
  });

  it('should render the element if user is authenticated and has the required role', async () => {
    useUser.mockReturnValue({ isAuthenticated: true, user: { role: 'admin' } });

    render(<AuthRoute element={mockElement} allowedRoles={['admin']} />);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render the element if user is authenticated and no roles are required', async () => {
    useUser.mockReturnValue({ isAuthenticated: true, user: { role: 'user' } });

    render(<AuthRoute element={mockElement} />);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});