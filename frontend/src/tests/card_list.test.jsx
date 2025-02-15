import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardList } from '../elements/cardList/cardList';

jest.mock('../elements/card_table/card_table', () => ({
  CardTable: jest.fn(() => <div>CardTable Component</div>),
}));

describe('CardList', () => {
  const mockTitle = 'Test Title';
  const mockSuffix = 'Test Suffix';
  const mockList = ['Monday', 'Tuesday'];
  const mockLessonsList = [
    { day: 'Monday', lesson: 'Math' },
    { day: 'Tuesday', lesson: 'Science' },
  ];

  it('should render the title', async () => {
    render(<CardList title={mockTitle} list={mockList} suffix={mockSuffix} lessonsList={mockLessonsList} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('should render Card components when lessonsList is not empty', async () => {
    render(<CardList title={mockTitle} list={mockList} suffix={mockSuffix} lessonsList={mockLessonsList} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getAllByText('CardTable Component')).toHaveLength(2);
  });

  it('should render "Розклад відсутній" when lessonsList is empty', async () => {
    render(<CardList title={mockTitle} list={mockList} suffix={mockSuffix} lessonsList={[]} />);
    expect(screen.getByText('Розклад відсутній')).toBeInTheDocument();
  });

  it('should not render a Card component if there are no lessons for a day', async () => {
    const mockLessonsListWithNoLessonsOnTuesday = [
      { day: 'Monday', lesson: 'Math' },
    ];

    render(<CardList title={mockTitle} list={mockList} suffix={mockSuffix} lessonsList={mockLessonsListWithNoLessonsOnTuesday} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.queryByText('Tuesday')).not.toBeInTheDocument();
    expect(screen.getAllByText('CardTable Component')).toHaveLength(1);
  });
});