import React, { act } from 'react';
import { AddLessonModal } from '../elements/addLesson/addLesson';
import { Lessons } from '../api/lessons.js';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('../api/axios.js');
jest.mock('../api/lessons.js');

describe('AddLessonModal', () => {
  const mockAddLesson = jest.fn();
  const mockSelectedGroup = { value: 'group1', label: 'Group 1' };
  const mockDicts = {
    days: [{ id: 1, name: 'Monday' }, { id: 2, name: 'Tuesday' }],
    lesson_time: [{ id: 1, time: '10:00' }, { id: 2, time: '12:00' }],
    lessons: [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }],
  };

  beforeEach(async () => {
    render(
      <AddLessonModal
        selectedGroup={mockSelectedGroup}
        dicts={mockDicts}
        addLesson={mockAddLesson}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the modal when the button is clicked', () => {
    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    expect(screen.getByText('Додати заняття')).toBeInTheDocument();
  });

  it('should call addLesson with the correct values when handleOk is called', async () => {
    const mockResponse = { data: { id: 1, name: 'Lesson 1' } };
    Lessons.addLesson.mockResolvedValue(mockResponse);

    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });

    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    await waitFor(async () => {
      expect(Lessons.addLesson).toHaveBeenCalledWith({
        group: 'group1',
        lesson: '1',
        lesson_time: '1',
        day: '1',
        week: '1',
      });
      await waitFor(() => expect(mockAddLesson).toHaveBeenCalledWith(mockResponse.data));
    });
  });

  it('should set confirmLoading to true when handleOk is called', async () => {
    Lessons.addLesson.mockResolvedValue({ data: {} });

    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    await waitFor(() => {
      expect(screen.getByText('OK').closest('button')).toHaveAttribute('disabled');
    });
  });

  it('should set confirmLoading to false and close the modal after handleOk is called', async () => {
    Lessons.addLesson.mockResolvedValue({ data: {} });

    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    await waitFor(() => {
      expect(screen.queryByText('Додати заняття')).not.toBeInTheDocument();
      expect(screen.getByText('Додати урок')).toBeInTheDocument();
    });
  });

  it('should handle errors correctly when handleOk is called', async () => {
    const mockError = new Error('Add lesson failed');
    Lessons.addLesson.mockRejectedValue(mockError);

    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    await waitFor(() => {
      expect(Lessons.addLesson).toHaveBeenCalled();
      expect(screen.getByText('Додати заняття')).toBeInTheDocument();
      expect(screen.getByText('OK').closest('button')).not.toHaveAttribute('disabled');
    });
  });

  it('should close the modal when the cancel button is clicked', () => {
    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Додати заняття')).not.toBeInTheDocument();
  });

  it('should update state when dropdowns are changed', () => {
    const button = screen.getByText('Додати урок');
    fireEvent.click(button);

    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('custom dropdown render'), { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});