import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { SelectWithAdd } from '../elements/selectWithAdd/selectWithAdd';

describe('SelectWithAdd', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];
  const mockAddOptions = jest.fn().mockResolvedValue([{ value: '3', label: 'Option 3' }]);
  const mockGetLessonsList = jest.fn();
  const mockSetSelectedGroup = jest.fn();

  beforeEach(async () => {
    render(
      <SelectWithAdd
        options={mockOptions}
        addOptions={mockAddOptions}
        getLessonsList={mockGetLessonsList}
        setSelectedGroup={mockSetSelectedGroup}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Select component with the correct options', () => {
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should call setSelectedGroup and getLessonsList when an option is selected', async () => {
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    await waitFor(() => {
      expect(mockSetSelectedGroup).toHaveBeenCalledWith({ value: '1', label: 'Option 1' });
      expect(mockGetLessonsList).toHaveBeenCalledWith({ value: '1', label: 'Option 1' });
    });
  });

  it('should add a new option when addItem is called', async () => {
    const addButton = screen.getByTestId('button');
    const input = screen.getByPlaceholderText('Введіть ім\'я');

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddOptions).toHaveBeenCalledWith('3');
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });
});