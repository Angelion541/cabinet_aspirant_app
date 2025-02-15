import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { StudentCabinet } from '../pages/cabinets/student_cabinet/student_cabinet';
import { Lessons } from '../api/lessons';
import { HeaderBlock } from '../elements/header/header_block';
import { CardList } from '../elements/cardList/cardList';

jest.mock('../api/lessons');
jest.mock('../elements/header/header_block', () => ({
  HeaderBlock: jest.fn(() => <div>HeaderBlock Component</div>),
}));
jest.mock('../elements/card_list/card_list', () => ({
  CardList: jest.fn(() => <div>CardList Component</div>),
}));

describe('StudentCabinet', () => {
  const mockUser = { group_id: 'group1' };
  const mockLessons = [
    { id: 1, week: '1', day: 'Monday', lesson: 'Math' },
    { id: 2, week: '2', day: 'Tuesday', lesson: 'Science' },
  ];
  const mockMenuItems = ['Item1', 'Item2'];
  const mockDays = ['Monday', 'Tuesday'];

  beforeEach(() => {
    Lessons.getLessons.mockResolvedValue({ data: mockLessons });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch lessons and update state correctly', async () => {
    await act(async () => {
      render(<StudentCabinet user={mockUser} menuItems={mockMenuItems} days={mockDays} />);
    });

    await waitFor(() => {
      expect(Lessons.getLessons).toHaveBeenCalledWith('group1');
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'firstStudent',
          title: '1 Тиждень',
          lessonsList: [mockLessons[0]],
        }),
        {}
      );
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'secondStudent',
          title: '2 Тиждень',
          lessonsList: [mockLessons[1]],
        }),
        {}
      );
    });
  });

  it('should render HeaderBlock and CardList components', async () => {
    await act(async () => {
      render(<StudentCabinet user={mockUser} menuItems={mockMenuItems} days={mockDays} />);
    });

    expect(screen.getByText('HeaderBlock Component')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText('CardList Component')).toHaveLength(2);
    });
  });

  it('should handle empty lessons list', async () => {
    Lessons.getLessons.mockResolvedValue({ data: [] });

    await act(async () => {
      render(<StudentCabinet user={mockUser} menuItems={mockMenuItems} days={mockDays} />);
    });

    await waitFor(() => {
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'firstStudent',
          title: '1 Тиждень',
          lessonsList: [],
        }),
        {}
      );
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'secondStudent',
          title: '2 Тиждень',
          lessonsList: [],
        }),
        {}
      );
    });
  });

  it('should handle errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch lessons');
    Lessons.getLessons.mockRejectedValue(mockError);

    await act(async () => {
      render(<StudentCabinet user={mockUser} menuItems={mockMenuItems} days={mockDays} />);
    });

    await waitFor(() => {
      expect(Lessons.getLessons).toHaveBeenCalledWith('group1');
      // You can add more assertions here to check how the component handles the error
    });
  });

  it('should render correctly with no lessons for the first week', async () => {
    const mockLessonsWithNoFirstWeek = [
      { id: 2, week: '2', day: 'Tuesday', lesson: 'Science' },
    ];
    Lessons.getLessons.mockResolvedValue({ data: mockLessonsWithNoFirstWeek });

    await act(async () => {
      render(<StudentCabinet user={mockUser} menuItems={mockMenuItems} days={mockDays} />);
    });

    await waitFor(() => {
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'firstStudent',
          title: '1 Тиждень',
          lessonsList: [],
        }),
        {}
      );
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: mockDays,
          suffix: 'secondStudent',
          title: '2 Тиждень',
          lessonsList: [mockLessonsWithNoFirstWeek[0]],
        }),
        {}
      );
    });
  });
});