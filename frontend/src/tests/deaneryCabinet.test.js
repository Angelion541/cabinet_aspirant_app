import React, { act } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DeaneryCabinet } from '../pages/cabinets/deanery_cabinet/deanery_cabinet';
import { Lessons } from '../api/lessons.js';
import { HeaderBlock } from '../elements/header/header_block';
import { CardList } from '../elements/cardList/cardList';
import { SelectWithAdd } from '../elements/selectWithAdd/selectWithAdd';
import { AddLessonModal } from '../elements/addLesson/addLesson';

jest.mock('../api/lessons');
jest.mock('../elements/header/header_block', () => ({
  HeaderBlock: jest.fn(() => <div>HeaderBlock Component</div>),
}));
jest.mock('../elements/card_list/card_list', () => ({
  CardList: jest.fn(() => <div>CardList Component</div>),
}));
jest.mock('../elements/selectWithAdd/selectWithAdd', () => ({
  SelectWithAdd: jest.fn(() => <div>SelectWithAdd Component</div>),
}));
jest.mock('../elements/addLesson/addLesson', () => ({
  AddLessonModal: jest.fn(() => <div>AddLessonModal Component</div>),
}));

describe('DeaneryCabinet', () => {
  const mockGroups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
  ];
  const mockDicts = {
    days: [{ id: 1, name: 'Monday' }, { id: 2, name: 'Tuesday' }],
    lesson_time: [{ id: 1, time: '10:00' }, { id: 2, time: '12:00' }],
    lessons: [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }],
  };
  const mockLessonsList = [
    { id: 1, week: '1', day: 'Monday', lesson: 'Math' },
    { id: 2, week: '2', day: 'Tuesday', lesson: 'Science' },
  ];

  beforeEach(() => {
    Lessons.getGroups.mockResolvedValue({ data: { groups: mockGroups, ...mockDicts } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch groups and update state correctly', async () => {
    await act(async () => {
      render(<DeaneryCabinet />);
    });

    await waitFor(() => {
      expect(Lessons.getGroups).toHaveBeenCalled();
      expect(screen.getByText('HeaderBlock Component')).toBeInTheDocument();
      expect(screen.getByText('SelectWithAdd Component')).toBeInTheDocument();
      expect(screen.getAllByText('CardList Component')).toHaveLength(2);
      expect(screen.getByText('AddLessonModal Component')).toBeInTheDocument();
    });
  });

  it('should update lessons state correctly when lessonsList changes', async () => {
    await act(async () => {
      render(<DeaneryCabinet />);
    });

    await waitFor(() => {
      expect(Lessons.getGroups).toHaveBeenCalled();
    });

    // Simulate setting lessonsList state
    fireEvent.change(screen.getByText('SelectWithAdd Component'), {
      target: { value: mockLessonsList },
    });

    await waitFor(() => {
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: days,
          suffix: 'firstWeek',
          title: '1 Тиждень',
          lessonsList: [mockLessonsList[0]],
        }),
        {}
      );
      expect(CardList).toHaveBeenCalledWith(
        expect.objectContaining({
          list: days,
          suffix: 'secondWeek',
          title: '2 Тиждень',
          lessonsList: [mockLessonsList[1]],
        }),
        {}
      );
    });
  });

  it('should handle errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch groups');
    Lessons.getGroups.mockRejectedValue(mockError);

    await act(async () => {
      render(<DeaneryCabinet />);
    });

    await waitFor(() => {
      expect(Lessons.getGroups).toHaveBeenCalled();
      // You can add more assertions here to check how the component handles the error
    });
  });
});