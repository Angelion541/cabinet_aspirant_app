import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';

import { Lessons } from '../../api/lessons';

export function AddLessonModal({ selectedGroup, dicts, addLesson }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const showModal = () => {
    setOpen(true);
    console.log('selectedGroup', selectedGroup.value, selectedGroup.label)
  };

  const handleOk = async () => {
    console.log(selectedGroup)
    setConfirmLoading(true);
    const values = {
      group: selectedGroup.value,
      lesson: selectedLesson,
      lesson_time: selectedTime,
      day: selectedDay,
      week: selectedWeek,
    };

    const response = await Lessons.addLesson(values)

    addLesson(response.data);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setSelectedWeek(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedLesson(null);
    setOpen(false);
    setConfirmLoading(false);
  };

  if (!selectedGroup) { return <></> }

  return (
    <>
      <Button type="text" style={{ marginLeft: 20, marginBottom: 5 }} onClick={showModal}>
        {'Додати урок'}
      </Button>
      <Modal
        title="Додати заняття"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <>
          <div style={{ margin: '10px 0', marginBottom: 20 }}>{'Група: ' + selectedGroup.label}</div>
          <div id='day' style={{ marginBottom: 20 }}>
            <span>{'Тиждень: '}</span>
            <Select
              style={{
                width: 300,
                // ...parrentStyle,
              }}
              value={selectedWeek}
              placeholder="custom dropdown render"
              onChange={setSelectedWeek}
              options={['1', '2'].map(item => ({
                value: item,
                label: item,
              }))}
            />
          </div>
          <div id='day' style={{ marginBottom: 20 }}>
            <span>{'День тижня: '}</span>
            <Select
              style={{
                width: 300,
                // ...parrentStyle,
              }}
              value={selectedDay}
              placeholder="custom dropdown render"
              onChange={setSelectedDay}
              options={dicts?.days?.map(item => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
          <div id='lesson_time' style={{ marginBottom: 20 }}>
            <span>{'Час заняття: '}</span>
            <Select
              style={{
                width: 300,
                // ...parrentStyle,
              }}
              value={selectedTime}
              placeholder="custom dropdown render"
              onChange={setSelectedTime}
              options={dicts?.lesson_time?.map(item => ({
                value: item.id,
                label: item.time,
              }))}
            />
          </div>
          <div id='lesson_name' style={{ marginBottom: 20 }}>
            <span>{'Назва предмету: '}</span>
            <Select
              style={{
                width: 300,
                // ...parrentStyle,
              }}
              value={selectedLesson}

              placeholder="custom dropdown render"
              onChange={setSelectedLesson}
              options={dicts?.lessons?.map(item => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
        </>
      </Modal>
    </>
  );
};