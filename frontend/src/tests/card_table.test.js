import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { CardTable } from '../elements/cardTable/cardTable';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('CardTable', () => {
  const mockLessonsList = [
    { id: 1, time: '10:00', lesson: 'Math' },
    { id: 2, time: '12:00', lesson: 'Science' },
  ];

  it('should render table columns', async () => {
    await act(async () => {
      render(<CardTable lessonsList={mockLessonsList} />);
    });

    expect(screen.getByTestId('column-time')).toBeInTheDocument();
    expect(screen.getByTestId('column-lesson')).toBeInTheDocument();
  });

  it('should render table rows based on lessonsList', async () => {
    await act(async () => {
      render(<CardTable lessonsList={mockLessonsList} />);
    });

    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('should not render any rows if lessonsList is empty', async () => {
    await act(async () => {
      render(<CardTable lessonsList={[]} />);
    });

    expect(screen.queryByText('10:00')).not.toBeInTheDocument();
    expect(screen.queryByText('Math')).not.toBeInTheDocument();
    expect(screen.queryByText('12:00')).not.toBeInTheDocument();
    expect(screen.queryByText('Science')).not.toBeInTheDocument();
  });
});